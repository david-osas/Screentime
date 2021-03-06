import React, {useEffect, useState} from 'react'
import {useParams, useLocation} from 'react-router-dom'
import {useSelector} from 'react-redux'
import StarIcon from '@material-ui/icons/Star';
import Header from './partials/Header'
import Footer from './partials/Footer'
import ItemTitle from './ItemTitle'

//Item component to render more details on individual movies, whether in now showing or trending

function Item() {

  let imageSrc
  let {itemId, type} = useParams()
  let location = useLocation()
  let [key, setKey] = useState(null)
  let [genre, setIsGenre] = useState(null)
  let [cinemas, setCinemas] = useState(null)
  let platforms


  function getGenre(genre){
    let fetchOptions = {
      method: 'POST',
      body: JSON.stringify({genre}),
      credentials: 'same-origin',
      headers: {"Content-Type": "application/json"}
    }
    fetch('/server/genre', fetchOptions)
    .then(response => response.json())
    .then(res => {
      setIsGenre(res.genres)
    })
  }
  function getCinemas(){
    fetch('/server/cinemas', {credentials: 'same-origin'})
    .then(response => response.json())
    .then(res => {
      if(!cinemas){
        setCinemas(res)
      }
    })
  }

  useEffect(() => {
      fetch('/server/trailer/'+itemId, {credentials: 'same-origin'})
      .then(response => response.json())
      .then(res => {
        if(!key){
          setKey(res.key)
        }
      })

  },[itemId,key])

  function getItem(state){
    switch(type){
      case 'now-showing':
      getCinemas()
      return state.nowShowing.movies[itemId]
      case 'trending':
      platforms = state.platforms
      return state.trending[itemId]

      default:
      return state
    }
  }
  let value = useSelector(state => getItem(state))
  let item = location.state? location.state.result : value

  imageSrc = item.posterPath? 'https://image.tmdb.org/t/p/original'+item.posterPath: require('../images/theme.jpg')
  if(!genre){
    getGenre(item.genreIds)
  }
  let popularity = Math.round(item.popularity)


  return (<div className='container'>
    <Header/>
    <img src={imageSrc} className='item-img img-fluid bg-dark' alt='item'/>
    <ItemTitle title={item.title}/>
    <p>
      {item.adult? <span className='badge badge-pill badge-danger mr-3'>Rated 18</span>
        :<span className='badge badge-pill badge-primary mr-3'>Family friendly</span>}
      <span className='mr-3'>{popularity}<StarIcon className='star'/> </span>
      released: {item.releaseDate}
    </p>

    <p>{genre &&
      genre.map((g) => <span key={g} className="badge badge-pill badge-info mr-3">{g}</span>)}</p>

    <p>{item.overview}</p>
    {key &&<div align='center' className='trailer-div'>
      <iframe title='movie' className='trailer' src={"https://www.youtube.com/embed/"+key}></iframe>
    </div>}

    {cinemas && <div>
      <h3>Checkout available cinemas showing this movie right now</h3>
      <ul>
        {cinemas.places.map((c, i) => <li key={c}>{c+' cinema: $'+cinemas.prices[i]}</li>)}
      </ul>
    </div>}

    {type === 'trending' && <div>
      <h3>Checkout available streaming platforms to watch your amazing movies</h3>
      <ul>
        {platforms.map((p) => <li key={p}>{p}</li>)}
      </ul>
    </div>}

    <Footer/>
  </div>)
}

export default Item
