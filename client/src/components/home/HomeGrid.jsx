import React from 'react'
import {useSelector} from 'react-redux'
import NewsCard from '../cards/NewsCard'
import MovieCard from '../cards/MovieCard'

function HomeGrid(props) {
  let topShowing = useSelector(state => state.nowShowing.top)
  let topArticles = useSelector(state => Object.entries(state.news).splice(0,4))
  let topTrending = useSelector(state => Object.entries(state.trending).splice(0,4))
  


  return (<div className='row row-cols-1 row-cols-lg-2'>
    {props.gridName === 'Now Showing' &&
    topShowing.map((t) => <div className='col mb-4' key={t.id}>
          <MovieCard place='home' poster={t.posterPath} id={t.id} title={t.title}/>
        </div>)}

    {props.gridName === 'Trending' &&
    topTrending.map((t) => <div className='col mb-4' key={t[1].id}>
          <MovieCard place='home' poster={t[1].posterPath} id={t[1].id} title={t[1].title}/>
        </div>)}

    {props.gridName === 'News' &&
    topArticles.map((t) => <div className='col mb-4' key={t[1]._id}>
          <NewsCard poster={t[1].urlToImage} id={t[1]._id} title={t[1].title}/>
        </div>)}

  </div>)
}

export default HomeGrid
