import React, {useEffect, useState} from 'react'
import {useParams} from 'react-router-dom'
import {useSelector} from 'react-redux'
import StarIcon from '@material-ui/icons/Star';
import Header from './partials/Header'
import ItemTitle from './ItemTitle'

function Item() {

  let imageSrc
  let {itemId, type} = useParams()
  let [key, setKey] = useState(null)
  let [genre, setIsGenre] = useState(null)
  let [cinemas, setCinemas] = useState(null)
  let platforms


  function getGenre(genre){
    let fetchOptions = {
      method: 'POST',
      body: JSON.stringify({genre}),
      headers: {"Content-Type": "application/json"}
    }
    fetch('http://localhost:5000/server/genre', fetchOptions)
    .then(response => response.json())
    .then(res => {
      setIsGenre(res.genres)
    })
  }
  function getCinemas(){
    fetch('http://localhost:5000/server/cinemas')
    .then(response => response.json())
    .then(res => {
      if(!cinemas){
        setCinemas(res)
      }
    })
  }

  useEffect(() => {
      fetch('http://localhost:5000/server/trailer/'+itemId)
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
  let item = useSelector(state => getItem(state))

  imageSrc = item.posterPath? 'https://image.tmdb.org/t/p/original'+item.posterPath: require('./theme.jpg')
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

  </div>)
}

export default Item
