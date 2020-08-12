import React from 'react'

//Card component for the register component, created using bootstrap classes

function RegisterCard(){

  return(
    <div className="item-fill card bg-light text-white">
      <img src={require('../../images/avengers.png')} className="item-fill card-img" alt="..."/>
      <div className="news-tint card-img-overlay d-flex justify-content-center align-items-center">
        <div className='center-text'>
          <h2 className="card-title"><i>Welcome to a new frontier for movies</i></h2>
          <p className="card-text">
            Get ready to access to amazing now showing movies, see trending movies and always hear the hottest entertainment news.
          </p>
        </div>
      </div>
    </div>
  )
}

export default RegisterCard
