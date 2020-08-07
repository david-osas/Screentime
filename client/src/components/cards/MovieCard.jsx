import React from 'react'

function MovieCard(props) {

  return (<div className="card">
    <img src={require('../avengers.png')} className="card-img-top img-fluid" alt="alt"/> {
      props.place === 'home'
        ? <div className="card-body">
            <h5 className="card-title">Card title</h5>
            <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
            <a href='/item/2' className="card-link stretched-link">View</a>
          </div>
        : <div className="card-footer">
          Card footer
          <a href='/item/2' className="card-link stretched-link"></a>
        </div>
    }

    </div>)
}

export default MovieCard
