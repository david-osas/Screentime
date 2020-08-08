import React from 'react'

function NewsCard(props) {

  return (<div className="card text-white">
    <img src={props.poster === null? require('../avengers.png'): props.poster} className="img-fluid news-img" alt='news card'/>
    <div className="news-tint card-img-overlay d-flex align-items-end">
      <div className=''>
        <h5 className="card-title">Card title</h5>
        <p className="card-text w-75">{props.title}</p>
      </div>
      <a href='/item/2' className="card-link stretched-link text-white"><h4>View</h4></a>
    </div>
  </div>)
}

export default NewsCard
