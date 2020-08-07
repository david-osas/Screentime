import React from 'react'

function NewsCard() {

  return (<div className="card text-white">
    <img src={require('../avengers.png')} className="img-fluid" alt="..."/>
    <div className="news-tint card-img-overlay d-flex align-items-end">
      <div className=''>
        <h5 className="card-title">Card title</h5>
        <p className="card-text w-75">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
      </div>
      <a href='/item/2' className="card-link stretched-link text-white"><h4>View</h4></a>
    </div>
  </div>)
}

export default NewsCard
