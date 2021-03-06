import React from 'react'
import {Link} from 'react-router-dom'

//Movie card component, created using bootstrap classes  

function MovieCard(props) {
  let imageSrc = props.poster? 'https://image.tmdb.org/t/p/original'+props.poster: require('../../images/theme.jpg')

  return (<div className="card">
    <img src={imageSrc} className="card-img-top img-fluid" alt="alt"/> {
      props.place === 'home'
        ? <div className="card-body">
            <Link to={'/item/'+props.type+'/'+props.id} className="card-link stretched-link">
            <h5 className="card-title">{props.title.toUpperCase()}</h5>
            </Link>
            <p className="card-text">{props.content}</p>
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
