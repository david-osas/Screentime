import React from 'react'

function Jumbotron(props) {

  return (<div class={props.place === 'list'
      ? "jumbotron jumbotron-fluid"
      : "jumbotron jumbotron-fluid item-jumbo"} style={{
      marginBottom: 50
    }}>
    {
      props.place === 'list'
        ? <div class="container">
            <h1 class="display-4">Fluid jumbotron</h1>
            <p class="lead">This is a modified jumbotron that occupies the entire horizontal space of its parent.</p>
          </div>
        :<img src={require('./avengers.png')} className='item-fill'/>
    }

  </div>)
}

export default Jumbotron
