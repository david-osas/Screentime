import React from 'react'

function MovieCard(props) {

  function showAlert() {
    alert('clicked')
  }

  return (<div className="card">
    <img src={require('./avengers.png')} className="card-img-top img-fluid" alt="alt"/> {
      props.place === 'home'
        ? <div className="card-body">
            <h5 className="card-title">Card title</h5>
            <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
            <a href="#" className="card-link stretched-link" onClick={showAlert}>View</a>
          </div>
        : <div class="card-footer">
          Card footer
        </div>
    }

    </div>)
}

export default MovieCard
