require('dotenv').config()
const mongoose = require('mongoose')
const session = require('express-session')
const MongoStore = require('connect-mongo')(session)

const {getShowing, getPopular, getGenreList, getNews} = require('./api')
let update = false

mongoose.connect('mongodb://localhost:27017/screentimeDB', {
  useFindAndModify: false,
  useNewUrlParser: true,
  useUnifiedTopology: true
})

exports.sess = {
  secret: process.env.TMB_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    // 7 * 24 * 60 * 60 * 1000
    maxAge: 7 * 24 * 60 * 60 * 1000
  },
  store: new MongoStore({mongooseConnection: mongoose.connection})
}

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
  email: String
})

const genreSchema = mongoose.Schema({id: Number, name: String})

const articlesSchema = mongoose.Schema({
  source: {
    id: String,
    name: String
  },
  author: String,
  title: String,
  description: String,
  url: String,
  urlToImage: String,
  publishedAt: String,
  content: String
})

const Movie = mongoose.model('Movie', moviesSchema)
const Popular = mongoose.model('Popular', moviesSchema)
const Showing = mongoose.model('Showing', showingSchema)
const User = mongoose.model('User', userSchema)
const Genre = mongoose.model('Genre', genreSchema)
const Article = mongoose.model('Article', articlesSchema)

const modelList = ['movies', 'populars', 'showings', 'genres', 'articles']

async function setData() {
  let resShowing = await getShowing()
  try {
    await Movie.insertMany(resShowing.moviesList)
  } catch (e) {
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
  try {
    await Popular.insertMany(resPopular)
  } catch (e) {
    console.log(e)
  }
  console.log('I am done setting popular movies')

  let resGenreList = await getGenreList()
  try {
    await Genre.insertMany(resGenreList)
  } catch (e) {
    console.log(e)
  }
  console.log('I am done setting genre list')

  let newsList = await getNews()
  try {
    await Article.insertMany(newsList)
  } catch (e) {
    console.log(e)
  }
  console.log('I am done setting top news')
  update = false
  console.log('i am done updating')
}

function isUpdating(req, res, next){
  if(update){
    console.log('waiting for update')
    setTimeout(isUpdating, 3000, req, res, next)
  }else{
    next()
  }
}

function startUpdate(){
  console.log('Update is starting')

  update = true
  for(let i = 0; i < modelList.length; i++){
    mongoose.connection.db.dropCollection(modelList[i], function(err, result) {
      console.log('I have dropped '+ modelList[i])
    })
  }
  setData()
}

exports.Movie = Movie
exports.Popular = Popular
exports.Showing = Showing
exports.User = User
exports.Genre = Genre
exports.Article = Article
exports.session = session
exports.setData = setData

exports.isUpdating = isUpdating
exports.runUpdate = () => setInterval(startUpdate, 1 * 60 * 1000)
