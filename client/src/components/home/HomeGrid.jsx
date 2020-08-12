import React from 'react'
import {useSelector} from 'react-redux'
import NewsCard from '../cards/NewsCard'
import MovieCard from '../cards/MovieCard'

//Home grid component used to render grids of cards in different sections of the home page

function HomeGrid(props) {
  let topShowing = useSelector(state => state.nowShowing.top)
  let topArticles = useSelector(state => state.news.slice(0,4))
  let topTrending = useSelector(state => Object.entries(state.trending).slice(0,8))

  return (props.gridName !== 'News'?
    <div className='row row-cols-1 row-cols-lg-4 row-cols-md-2'>
    {props.gridName === 'Now Showing' &&
    topShowing.map((t) => <div className='col mb-4' key={t.id}>
          <MovieCard place='home' content={t.overview.slice(0,100)+'...'} type='now-showing'
            poster={t.posterPath} id={t.id} title={t.title}/>
        </div>)}

    {props.gridName === 'Trending' &&
    topTrending.map((t) => <div className='col mb-4' key={t[1].id}>
          <MovieCard place='home' content={t[1].overview.slice(0,100)+'...'} type='trending'
            poster={t[1].posterPath} id={t[1].id} title={t[1].title}/>
        </div>)}
    </div>
    :
  <div className='row row-cols-1 row-cols-lg-2'>
    {topArticles.map((t) => <div className='col mb-4' key={t._id}>
          <NewsCard poster={t.urlToImage} url={t.url} title={t.title}/>
        </div>)}
  </div>)
}

export default HomeGrid
