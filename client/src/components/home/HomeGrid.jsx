import React from 'react'
import NewsCard from './NewsCard'
import MovieCard from './MovieCard'

function HomeGrid(props) {
  let nums = [1, 2, 3, 4]

  return (<div className='row row-cols-1 row-cols-lg-2'>
    {
      nums.map((n) => <div className='col mb-4' key={n}>
        {
          props.gridName === 'News'
            ? <NewsCard/>
            : <MovieCard place='home'/>
        }

      </div>)
    }
  </div>)
}

export default HomeGrid
