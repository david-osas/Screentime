import React from 'react'

//Carousel indicator component

function Indicator(props){

  return(
    <ol className="carousel-indicators">
      {props.list.map((indicate, index) =>
      <li key={indicate} data-target={props.id} data-slide-to={indicate}
        className={index === 0? 'active': ''}></li>
      )}
    </ol>
  )
}

export default Indicator
