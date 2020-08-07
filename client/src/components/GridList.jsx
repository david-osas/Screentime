import React from 'react'
import {useLocation} from 'react-router-dom'
import Jumbotron from './Jumbotron'
import MovieCard from './cards/MovieCard'
import NewsCard from './cards/NewsCard'
import Header from './partials/Header'

function GridList() {
  let location = useLocation()
  let numbers = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16]
  let breakpoints
  if(location.pathname !== '/latest-news'){
    breakpoints = 'row row-cols-1 row-cols-lg-4 row-cols-md-2'
  }else{
    breakpoints = 'row row-cols-1 row-cols-lg-2'
  }

  return (<div className='container'>
    <Header/>
    <Jumbotron place='list'/>
    <div className={breakpoints}>
      {
        numbers.map((n) => <div key={n} className='col mb-4'>
          {location.pathname === '/latest-news'?
            <NewsCard />
            : <MovieCard place='list'/>}

        </div>)
      }
    </div>

  </div>)
}

export default GridList
