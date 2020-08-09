import React, {useEffect, useState} from 'react'
import {useLocation, useHistory, useParams} from 'react-router-dom'
import {useSelector} from 'react-redux'
import Pagination from '@material-ui/lab/Pagination'
import Jumbotron from './Jumbotron'
import MovieCard from './cards/MovieCard'
import NewsCard from './cards/NewsCard'
import Header from './partials/Header'

function GridList(props) {
  let location = useLocation()
  let nowShowing = useSelector(state => Object.entries(state.nowShowing.movies))
  let trending = useSelector(state => Object.entries(state.trending))
  let news = useSelector(state => state.news)
  let [totalPages, setTotal] = useState(1)
  let history = useHistory()
  let {page} = useParams()


  useEffect(() => {
    fetch('http://localhost:5000/server/page-numbers')
    .then(response => response.json())
    .then(res => {
      setTotal(res.num)
    })
  }, [])

  function handlePage(event, value){
    history.push('/now-showing/'+value)
  }

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
      {props.type === 'nowShowing' &&
      nowShowing.map((t) => <div key={t[1].id} className='col mb-4'>
        <MovieCard place='list' page={page} type='nowShowing' poster={t[1].posterPath} id={t[1].id} title={t[1].title} />
      </div>)}

      {props.type === 'trending' &&
      trending.map((t) => <div key={t[1].id} className='col mb-4'>
        <MovieCard place='list' page={page} type='trending' poster={t[1].posterPath} id={t[1].id} title={t[1].title}/>
      </div>)}

      {props.type === 'news' &&
      news.map((t) => <div className='col mb-4' key={t._id}>
        <NewsCard poster={t.urlToImage} url={t.url} title={t.title}/>
    </div>)}
    {props.type === 'nowShowing' &&
    <Pagination className='mx-auto my-4' count={totalPages} color='primary' onChange={handlePage}/>}

  </div>
</div>)
}

export default GridList
