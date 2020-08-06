import React from 'react'
import Header from './partials/Header'
import Jumbotron from './Jumbotron'

function Item(){

  return (
    <div className='container'>
      <Header/>
      <Jumbotron place='item'/>
    </div>
  )
}

export default Item
