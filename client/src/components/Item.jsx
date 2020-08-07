import React from 'react'
import Header from './partials/Header'


function Item(){

  return (
    <div className='container'>
      <Header/>
      <img src={require('./avengers.png')} className='item-img img-fluid bg-dark' alt='item' />
    </div>
  )
}

export default Item
