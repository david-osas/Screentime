//jshint esversion: 6

const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const {getInitial} = require('./api')

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



app.get('/movies/:pageId', (req, res) => {
  var page = req.params.pageId
  var size = (page - 1) * 16
  Movie.find({}, null, {skip: size, limit: 16},(err, results) => {
    if(err){
      console.log(err)
    }else{
      res.send(results)
    }

  })

  Showing.find({}, 'totalMovies')

})
