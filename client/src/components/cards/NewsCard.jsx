import React from 'react'

function NewsCard(props) {

  return (<div className="card text-white">
    <img src={props.poster === null? require('../../images/theme.jpg'): props.poster} className="img-fluid movie-img" alt='news card'/>
    <div className="news-tint card-img-overlay d-flex align-items-end">
      <p className="card-text w-75">{props.title}</p>
      <a href={props.url} target='_blank'
        rel="noopener noreferrer" className="card-link stretched-link text-white"><h4>View</h4></a>
    </div>
  </div>)
}

export default NewsCard
