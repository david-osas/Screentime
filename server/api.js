require('dotenv').config()
const fetch = require('node-fetch')



exports.getShowing = async function() {
  let pagesData = []
  let moviesList = []
  let page = 1
  let url = "https://api.themoviedb.org/3/movie/now_playing?api_key=" + process.env.TMB_KEY + "&language=en-US&page=" + page + "&region=us"

  let response = await fetch(url)
  let movies = await response.json()
  let totalPages = movies.total_pages
  let period = movies.dates
  let totalMovies = movies.total_results
  pagesData.push(...movies.results)

  for (let i = 0; i < totalPages - 1; i++) {
    page++
    url = "https://api.themoviedb.org/3/movie/now_playing?api_key=" + process.env.TMB_KEY + "&language=en-US&page=" + page + "&region=us"
    response = await fetch(url)
    movies = await response.json()
    pagesData.push(...movies.results)
  }


  pagesData.forEach((item) => {
    moviesList.push({
      popularity: item.popularity,
      posterPath: item.poster_path,
      id: item.id,
      adult: item.adult,
      title: item.title.toLowerCase(),
      genreIds: item.genre_ids,
      overview: item.overview,
      releaseDate: item.release_date
    })
  })
  return ({totalMovies, period, moviesList})
}

exports.getPopular = async function(){
  let popularList = []
  let url = "https://api.themoviedb.org/3/movie/popular?api_key=" + process.env.TMB_KEY + "&language=en-US&page=1&region=us"
  let response = await fetch(url)
  let popularJson = await response.json()
  let popularMovies = popularJson.results

  popularMovies.forEach((item) => {
    popularList.push({
      popularity: item.popularity,
      posterPath: item.poster_path,
      id: item.id,
      adult: item.adult,
      title: item.title.toLowerCase(),
      genreIds: item.genre_ids,
      overview: item.overview,
      releaseDate: item.release_date
    })
  })
  return (popularList)
}

exports.getGenreList = async function(){
  let url = "https://api.themoviedb.org/3/genre/movie/list?api_key=" + process.env.TMB_KEY + "&language=en-US"
  let response = await fetch(url)
  let genreIds = await response.json()

  return genreIds.genres
}

exports.getNews = async function(){
  let url = "https://newsapi.org/v2/top-headlines?country=us&category=entertainment&apiKey="+process.env.NEWS_KEY
  let response = await fetch(url)
  let news = await response.json()

  return news.articles

}
