import React from 'react'
import {useParams} from 'react-router-dom'
import {useSelector} from 'react-redux'
import Header from './partials/Header'
import ItemTitle from './ItemTitle'

function Item() {

  let imageSrc
  let content
  let {itemId, type} = useParams()

  function getItem(state){
    switch(type){
      case 'nowShowing':
      return state.nowShowing.movies[itemId]
      case 'trending':
      return state.trending[itemId]
      case 'news':
      return state.news[itemId]

      default:
      return state
    }
  }
  let item = useSelector(state => getItem(state))
  if(type !== 'news'){
    imageSrc = item.posterPath? 'https://image.tmdb.org/t/p/original'+item.posterPath: require('./avengers.png')
    content = item.overview
  }else{
    imageSrc = item.urlToImage? item.urlToImage: require('./avengers.png')
    content = item.content
  }


  return (<div className='container'>
    <Header/>
    <img src={imageSrc} className='item-img img-fluid bg-dark' alt='item'/>
    <ItemTitle title={item.title}/>
    <p>{content}</p>
    <iframe title='movie' width="420" height="345" src="https://www.youtube.com/embed/FYMl2AMdShE"></iframe>

  </div>)
}

export default Item
