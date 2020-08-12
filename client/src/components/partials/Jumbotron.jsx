import React from 'react'

//Jumbotron component, used in grid list component to display headers of different grid lists

function Jumbotron(props) {
  let place
  switch(props.place){
    case 'now-showing':
    place = 'new releases available in cinemas'
    break
    case 'trending':
    place = 'trending movies'
    break
    case 'news':
    place = 'hot topics about the world of entertainment'
    break

    default:
    place = ''
  }

  return (<div className="jumbotron jumbotron-fluid bg-dark text-white">

    <div className="container">
      <h2 className="display-4 center-text" >
        Showing list of {place}
      </h2>
    </div>

  </div>)
}

export default Jumbotron
