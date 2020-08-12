import React from 'react'
import CarouselImg from './CarouselImg'
import Indicator from './Indicator'
import jamesBond from '../../images/james-bond.jpg'
import oldGaurd from '../../images/old-gaurd.jpg'
import hobbit from '../../images/hobbit.jpg'

//Carousel component for the home page component, carousel styling is done using bootstrap classes

function Carousel() {
  const first = 'See the hottest movies showing in cinemas and never miss a new release'
  const second = 'Checkout trending movies available for streaming and always have them one click away'
  const third = 'Always be caught up on the latest news from the world of entertainment and never miss a gist'
  let carouselDetails = [first, second, third]
  let indicatorsList = ['0', '1', '2']
  let carouselIds = ['top-carousel', 'news-carousel']
  const imageSrc = [jamesBond, oldGaurd, hobbit]

  return (<div id={carouselIds[0]} className="carousel slide" data-ride="carousel">
    <Indicator id={'#'+carouselIds[0]} list={indicatorsList}/>
    <div className="carousel-inner">
      {
        carouselDetails.map((detail, i) => <CarouselImg key={detail} data= {detail} index= {i} imageSrc={imageSrc[i]}/>)
      }
    </div>
    <a className="carousel-control-prev" href={'#'+carouselIds[0]} role="button" data-slide="prev">
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="sr-only">Previous</span>
      </a>
      <a className="carousel-control-next" href={'#'+carouselIds[0]} role="button" data-slide="next">
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="sr-only">Next</span>
      </a>
  </div>)
}

export default Carousel
