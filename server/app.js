//jshint esversion: 6
require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const saltRounds = 10
const session = require('express-session')
const MongoStore = require('connect-mongo')(session)

const {getInitial, getPopular, getGenreList} = require('./api')
const {getCinemas} = require('./cinema')
const {isAuthenticated} = require('./middleware')
const {platforms} = require('./streamingPlatforms')

const app = express()

mongoose.connect('mongodb://localhost:27017/screentimeDB', {
  useFindAndModify: false,
  useNewUrlParser: true,
  useUnifiedTopology: true
})

var sess = {
  secret: process.env.TMB_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    // 7 * 24 * 60 * 60 * 1000
    maxAge: 300000
  },
  store: new MongoStore({mongooseConnection: mongoose.connection})
}

if (app.get('env') === 'production') {
  app.set('trust proxy', 1)
  sess.cookie.secure = true
}

//, isAuthenticated
app.use(bodyParser.urlencoded({extended: true}), session(sess))


const moviesSchema = new mongoose.Schema({
  popularity: Number,
  posterPath: String,
  id: Number,
  adult: Boolean,
  title: String,
  genreIds: [],
  overview: String,
  releaseDate: String
})

const showingSchema = new mongoose.Schema({
  totalMovies: Number,
  period: {
    maximum: String,
    minimum: String
  }
})

const userSchema = mongoose.Schema({
  username: String,
  password: String,
  email: String,
  liked: [],
  history: [],
  subscribed: []
})

const genreSchema = mongoose.Schema({
  id: Number,
  name: String
})

const Movie = mongoose.model('Movie', moviesSchema)
const Popular = mongoose.model('Popular', moviesSchema)
const Showing = mongoose.model('Showing', showingSchema)
const User = mongoose.model('User', userSchema)
const Genre = mongoose.model('Genre', genreSchema)


async function setInitial() {
  let resShowing = await getInitial()
  try{
    await Movie.insertMany(resShowing.moviesList)
  }catch(e){
    console.log(e)
  }
  await new Showing({
    totalMovies: resShowing.totalMovies,
    period: {
      maximum: resShowing.period.maximum,
      minimum: resShowing.period.minimum
    }
  }).save((err) => {
    if (!err) {
      console.log('I am done setting now showing movies')
    } else {
      console.log(err)
    }
  })

  let resPopular = await getPopular()
  try{
    await Popular.insertMany(resPopular)
  }catch(e){
    console.log(e)
  }
  console.log('I am done setting popular movies')

  let resGenreList = await getGenreList()
  try {
    await Genre.insertMany(resGenreList)
  }catch(e){
    console.log(e)
  }
  console.log('I am done setting genre list')
}

//setInitial()



app.get('/page-numbers', (req, res) => {

  Showing.findOne({}, (err, results) => {
    var total = results.totalMovies

    var nums
    if (!err) {
      nums = Math.floor(total / 16)
      if (total % 16 > 0) {
        nums++
      }
      res.send(nums.toString())
    } else {
      console.log(err)

    }
  })
})

app.get('/cinemas', (req, res) => {
  res.send(getCinemas())
})

app.get('/genre-list', (req, res) => {
  Genre.find({},(err, results) => {
    res.send(results)
  })
})

app.patch('/subscribe', (req, res) => {
  User.findOne({
    email: req.session.user
  }, (err, results) => {
    if(!err){
      if(results.subscribed.length >= 5){
        return res.send('failure')
      }else{
        results.subscribed.push(req.body.genreId)
        results.save()
        return res.send('success')
      }

    }else{
      console.log(err)
    }
  })
})

app.patch('/unsubcribe', (req, res) => {
  User.findOne({
    email: req.session.user
  }, (err, results) => {
    if(!err){
      results.subscribed = results.subscribed.filter(s => s !== req.body.genreId)
      results.save()
      return res.send('success')
    }else{
      console.log(err)
    }
  })
})


app.get('/search-movie', (req, res) => {

  Movie.findOne({
    title: req.body.movie.toLowerCase()
  }, (err, results) => {
    if (!err) {
      res.send(results)
    } else {
      console.log(err)
    }
  })
})

app.patch('/like-movie', (req, res) => {
  User.findOneAndUpdate({
    email: req.session.user
  }, {
    $addToSet: {
      liked: req.body.movieId
    }
  }, (err, results) => {
    if(!err){
      res.send('success')
    }else{
      console.log(err)
    }
  })
})

app.patch('/unlike-movie', (req, res) => {
  User.findOne({
    email: req.session.user
  }, (err, results) => {
    if(!err){
      results.liked = results.liked.filter(s => s !== req.body.movieId)
      results.save()
      return res.send('success')
    }else{
      console.log(err)
    }
  })
})

app.get('/movies/:pageId', (req, res) => {
  var page = req.params.pageId
  var size = (page - 1) * 16

  Movie.find({}, null, {
    skip: size,
    limit: 16
  }, (err, results) => {
    if (!err) {
      res.send(results)
    } else {
      console.log(err)
    }
  })
})

app.get('/popular-movies', (req, res) => {
  Popular.find({}, (err, results) => {
    if (!err) {
      res.send({popularMovies: results, platforms})
    } else {
      console.log(err)
    }
  })

})



app.post('/signup', async (req, res) => {
  let name = false
  let mail = false
  await User.findOne({
    username: req.body.username
  }, (err, results) => {
    if (!err && results) {
      name = true
    }
  })

  await User.findOne({
    email: req.body.email
  }, (err, results) => {
    if (!err && results) {
      mail = true
    }
  })

  if (name && mail) {
    return res.send('both')
  } else if (name) {
    return res.send('username')
  } else if (mail) {
    return res.send('email')
  }

  bcrypt.hash(req.body.password, saltRounds, (err, hash) => {
    if (!err) {
      const newUser = new User({
        username: req.body.username,
        password: hash,
        email: req.body.email,
        liked: [],
        history: [],
        subscribed: []
      })
      newUser.save((err) => {
        if (!err) {
          req.session.user = req.body.email
          return res.send('success')
        } else {
          console.log(err)
          return res.send('failure')
        }
      })
    } else {
      console.log(err)
      return res.send('failure')
    }

  })
})

app.post('/login', (req, res) => {

  User.findOne({
    email: req.body.email
  }, (err, results) => {
    if (!err && results) {
      bcrypt.compare(req.body.password, results.password, (err, comp) => {
        if (comp) {
          req.session.user = req.body.email
          return res.send({username: results.username, liked: results.liked, history: results.history, subscribed: results.subscribed})
        } else {
          return res.send('password')
        }
      })
    } else {
      return res.send('email')
    }
  })

})

app.delete('/logout', (req, res) => {
  req.session.destroy(() => {
    res.send('user logged out')
  })
})

app.get('/checking', (req, res) => {
  if (req.session.user) {
    res.send('you are signed in bro')
  } else {
    res.send('get the hell outta here')
  }
})
app.get('/register', (req, res) => {
  console.log('i got here')
  res.send('login')
})



app.get('/*',(req, res) => {
  res.send('welcome home')
})

app.listen(5000, () => {
  console.log('server started on port 5000')
})
