//jshint esversion: 6

const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const saltRounds = 10

const {getInitial} = require('./api')
const {getCinemas} = require('./cinema')

const app = express()

app.use(bodyParser.urlencoded({extended: true}))

mongoose.connect('mongodb://localhost:27017/screentimeDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

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

  Showing.find({}, (err, results) => {
    var total = results[0].totalMovies

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

  Movie.find({
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
  let isUsername = true
  let isEmail = true

  isUsername = await User.find({
    username: req.body.username
  }, (err, results) => {
    if (!err && results.length === 0) {
      return false
    }
  })

  isEmail = await User.find({
    email: req.body.email
  }, (err, results) => {
    if (!err && results.length === 0) {
      return false
    }
  })

  if(isEmail && isUsername){
    res.send('both')
  }else if (isEmail) {
    res.send('email')
  }else if (isUsername) {
    res.send('username')
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
          res.send('success')
        } else {
          console.log(err)
          res.send('failure')
        }
      })
    } else {
      console.log(err)
      res.send('failure')
    }

  })
})

app.post('/login', async (req, res) => {
  let user

  user = await User.find({email: req.body.email}, (err, results) => results)

  if(hash.length > 0){
    bcrypt.compare(req.body.password, user.password, (err, result) => {
      if(result){
        res.send({username: user.username, liked: user.liked, history: user.history, subscribed: user.subscribed})
      }else{
        res.send('password')
      }
    })
  }else{
    res.send('email')
  }

})

app.listen(5000, () => {
  console.log('server started on port 5000')
})
