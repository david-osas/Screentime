//jshint esversion: 6
require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const saltRounds = 10
const session = require('express-session')
const MongoStore = require('connect-mongo')(session)

const {getInitial} = require('./api')
const {getCinemas} = require('./cinema')

const app = express()

app.use(bodyParser.urlencoded({extended: true}))

mongoose.connect('mongodb://localhost:27017/screentimeDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

var sess = {
  secret: process.env.TMB_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 300000
  },
  store: new MongoStore({mongooseConnection: mongoose.connection})
}

if (app.get('env') === 'production') {
  app.set('trust proxy', 1)
  sess.cookie.secure = true
}

app.use(session(sess))

const moviesSchema = new mongoose.Schema({
  popularity: Number,
  posterPath: String,
  id: Number,
  adult: Boolean,
  title: String,
  genreIds: [],
  overview: String
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

const Movie = mongoose.model('Movie', moviesSchema)
const Showing = mongoose.model('Showing', showingSchema)
const User = mongoose.model('User', userSchema)

async function setInitial() {
  var response = await getInitial()
  var movieResult = await Movie.insertMany(response.moviesList)
  var showingResult = await new Showing({
    totalMovies: response.totalMovies,
    period: {
      maximum: response.period.maximum,
      minimum: response.period.minimum
    }
  }).save((err) => {
    if (!err) {
      console.log('I am done setting things up')
    } else {
      console.log(err)
    }
  })

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

app.post('/search-movie', (req, res) => {

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

app.get('/cinemas', (req, res) => {
  res.send(getCinemas())
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

app.get('/logout', (req, res) => {
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

app.listen(5000, () => {
  console.log('server started on port 5000')
})
