import React from 'react'
import CarouselImg from './CarouselImg'
import Indicator from './Indicator'

function Carousel() {
  let carouselDetails = ['First slide label', 'Second slide label', 'Third slide label']
  let indicatorsList = ['0', '1', '2']
  let carouselIds = ['top-carousel', 'news-carousel']
  let carouselControls = ['previous','next']

  return (<div id={carouselIds[0]} className="carousel slide" data-ride="carousel">
    <Indicator id={'#'+carouselIds[0]} list={indicatorsList}/>
    <div className="carousel-inner">
      {
        carouselDetails.map((detail, i) => <CarouselImg key={detail} data= {detail} index= {i}/>)
      }
    </div>
    <a class="carousel-control-prev" href={'#'+carouselIds[0]} role="button" data-slide="prev">
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="sr-only">Previous</span>
      </a>
      <a class="carousel-control-next" href={'#'+carouselIds[0]} role="button" data-slide="next">
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="sr-only">Next</span>
      </a>
  </div>)
}

export default Carousel
