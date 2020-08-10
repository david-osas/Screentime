import React from 'react'
import {Link} from 'react-router-dom'

function MovieCard(props) {
  let imageSrc = props.poster? 'https://image.tmdb.org/t/p/original'+props.poster: require('../theme.jpg')

  return (<div className="card">
    <img src={imageSrc} className="card-img-top img-fluid movie-img" alt="alt"/> {
      props.place === 'home'
        ? <div className="card-body">
            <h5 className="card-title">{props.title.toUpperCase()}</h5>
            <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
            <Link to={'/item/'+props.type+'/'+props.id} className="card-link stretched-link">View</Link>
          </div>
        : <div className="card-footer">          
          <Link to={'/item/'+props.type+'/'+props.id} className="card-link stretched-link">
          {props.title.toUpperCase()}
          </Link>
        </div>
    }

    </div>)
}

export default MovieCard
