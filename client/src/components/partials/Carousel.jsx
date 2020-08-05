import React from 'react'

function Carousel() {
  let carouselDetails = ['First slide label', 'Second slide label', 'Third slide label']
  let indicatorsList = ['0', '1', '2']

  return (<div id="carouselExampleCaptions" className="carousel slide" data-ride="carousel">
    <ol className="carousel-indicators">
      {indicatorsList.map((indicate, index) =>
      <li key={indicate} data-target="#carouselExampleCaptions" data-slide-to={indicate}
        className={index === 0? 'active': ''}></li>
      )}
    </ol>
    <div className="carousel-inner">
      {
        carouselDetails.map((data, index) => <div key={data} className={index === 0
            ? "carousel-item active"
            : "carousel-item"}>
          <img src={require('../avengers.png')} className=" carousel-img img-fluid d-block w-100" alt={data}/>
          <div className="carousel-caption d-none d-md-block">
            <h5>{data}</h5>
          </div>
        </div>)
      }
    </div>
    <a className="carousel-control-prev" href="#carouselExampleCaptions" role="button" data-slide="prev">
      <span className="carousel-control-prev-icon" aria-hidden="true"></span>
      <span className="sr-only">Previous</span>
    </a>
    <a className="carousel-control-next" href="#carouselExampleCaptions" role="button" data-slide="next">
      <span className="carousel-control-next-icon" aria-hidden="true"></span>
      <span className="sr-only">Next</span>
    </a>
  </div>)
}

export default Carousel
