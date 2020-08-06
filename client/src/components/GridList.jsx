import React from 'react'
import Jumbotron from './Jumbotron'
import MovieCard from './MovieCard'
import NewsCard from './NewsCard'
import Header from './partials/Header'

function GridList() {

  let numbers = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16]
  let category = ['movies', 'news']

  return (<div className='container'>
    <Header/>
    <Jumbotron place='list'/>
    <div className='row row-cols-2 row-cols-lg-2'>
      {
        numbers.map((n) => <div className='col mb-4'>
          <NewsCard key={n} place='list'/>
        </div>)
      }
    </div>

  </div>)
}

export default GridList
