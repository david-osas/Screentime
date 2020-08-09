import React, {useEffect, useState} from 'react'
import {useLocation} from 'react-router-dom'
import {useSelector, useDispatch} from 'react-redux'
import Pagination from '@material-ui/lab/Pagination'
import Jumbotron from './Jumbotron'
import MovieCard from './cards/MovieCard'
import NewsCard from './cards/NewsCard'
import Header from './partials/Header'
import {setNowShowing} from '../actions/movies'

function GridList(props) {
  let location = useLocation()
  let nowShowing = useSelector(state => Object.entries(state.nowShowing.movies))
  let trending = useSelector(state => Object.entries(state.trending))
  let news = useSelector(state => Object.entries(state.news))
  let [page, setPage] = useState(1)
  let dispatch = useDispatch()

  useEffect(() => {
    fetch('http://localhost:5000/server/page-numbers')
    .then(response => response.json())
    .then(res => {
      setPage(res.num)
    })
  }, [])

  function handlePage(event, value){
    dispatch(setNowShowing(value))
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
      {props.place === 'nowShowing' &&
      nowShowing.map((t) => <div key={t[1].id} className='col mb-4'>
        <MovieCard place='list' poster={t[1].posterPath} id={t[1].id} title={t[1].title}/>
      </div>)}

      {props.place === 'trending' &&
      trending.map((t) => <div key={t[1].id} className='col mb-4'>
        <MovieCard place='list' poster={t[1].posterPath} id={t[1].id} title={t[1].title}/>
      </div>)}

      {props.place === 'news' &&
      news.map((t) => <div className='col mb-4' key={t[1]._id}>
        <NewsCard poster={t[1].urlToImage} id={t[1]._id} title={t[1].title}/>
    </div>)}
    {props.place === 'nowShowing' &&
    <Pagination className='mx-auto my-4' count={page} color='primary' onChange={handlePage}/>}

  </div>
</div>)
}

export default GridList
