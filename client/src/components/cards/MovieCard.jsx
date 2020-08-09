import React from 'react'

function MovieCard(props) {
  let imageSrc = props.poster? 'https://image.tmdb.org/t/p/original'+props.poster: require('../avengers.png')

  return (<div className="card">
    <img src={imageSrc} className="card-img-top img-fluid movie-img" alt="alt"/> {
      props.place === 'home'
        ? <div className="card-body">
            <h5 className="card-title">{props.title.toUpperCase()}</h5>
            <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
            <a href={'/item/'+props.type+'/1/'+props.id} className="card-link stretched-link">View</a>
          </div>
        : <div className="card-footer">
          {props.title.toUpperCase()}
          <a href={'/item/'+props.type+'/'+props.page+'/'+props.id} className="card-link stretched-link"></a>
        </div>
    }

    </div>)
}

export default MovieCard
