require('dotenv').config()
const fetch = require('node-fetch')

let page = 1
let totalPages
let period
let totalMovies
let pagesData = []
let moviesList = []

async function getInitial() {
  var url = "https://api.themoviedb.org/3/movie/now_playing?api_key=" + process.env.TMB_KEY + "&language=en-US&page=" + page + "&region=us"

  var response = await fetch(url)
  var movies = await response.json()
  totalPages = movies.total_pages
  period = movies.dates
  totalMovies = movies.total_results
  pagesData.push([...movies.results])

  for (let i = 0; i < totalPages - 1; i++) {
    page++
    url = "https://api.themoviedb.org/3/movie/now_playing?api_key=" + process.env.TMB_KEY + "&language=en-US&page=" + page + "&region=us"
    response = await fetch(url)
    movies = await response.json()
    pagesData.push([...movies.results])
  }

  pagesData = pagesData.flat()
  pagesData.forEach((item) => {
    moviesList.push({
      popularity: item.popularity,
      posterPath: item.poster_path,
      id: item.id,
      adult: item.adult,
      title: item.title.toLowerCase(),
      genreIds: item.genre_ids,
      overview: item.overview
    })
  })
  return ({ totalMovies, period, moviesList})
}

exports.getInitial = getInitial
