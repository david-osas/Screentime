import React from 'react'

function RegisterCard(){

  return(
    <div className="item-fill card bg-light text-white">
      <img src={require('../../images/avengers.png')} className="item-fill card-img" alt="..."/>
      <div className="news-tint card-img-overlay">
        <h5 className="card-title">Card title</h5>
        <p className="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
        <p className="card-text">Last updated 3 mins ago</p>
      </div>
    </div>
  )
}

export default RegisterCard
