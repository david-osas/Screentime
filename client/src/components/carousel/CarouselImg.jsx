import React from 'react'

function CarouselImg(props){

  return (
    <div className={props.index === 0
        ? "carousel-item active"
        : "carousel-item"}>
      <img src={require('./avengers.png')} className=" carousel-img img-fluid d-block w-100" alt={props.data}/>
      <div className="carousel-caption d-none d-md-block">
        <h5>{props.data}</h5>
      </div>
    </div>
  )
}

export default CarouselImg
