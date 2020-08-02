//jshint esversion: 6

const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
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

const Movie = mongoose.model('Movie', moviesSchema)
const Showing = mongoose.model('Showing', showingSchema)

async function setInitial(){
  var response = await getInitial()
  var movieResult = await Movie.insertMany(response.moviesList)
  var showingResult = await new Showing({
    totalMovies: response.totalMovies,
    period: {
      maximum: response.period.maximum,
      minimum: response.period.minimum
    }
  }).save()
  console.log('I am done setting things up')
}

//setInitial()

app.get('/page-numbers', (req,res) => {

  Showing.find({} , (err,results) => {
    var total = results[0].totalMovies

    var nums
    if(!err){
      nums = Math.floor(total/16)
      if(total%16 > 0){
        nums++
      }
      res.send(nums.toString())
    }else{
      console.log(err)

    }
  })
})

app.post('/search-movie', (req, res) => {

  Movie.find({title: req.body.movie.toLowerCase()}, (err, results) => {
    if(!err){
    res.send(results)
  }else{
    console.log(err)
  }
  })
})


app.get('/movies/:pageId', (req, res) => {
  var page = req.params.pageId
  var size = (page - 1) * 16

  Movie.find({}, null, {skip: size, limit: 16},(err, results) => {
    if(!err){
      res.send(results)
    }else{
      console.log(err)

    }
  })
})


app.get('/cinemas', (req,res) => {
  res.send(getCinemas())
})


app.listen(5000, () => {
  console.log('server started on port 5000')
})
