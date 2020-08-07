import React from 'react'
import Header from './partials/Header'
import ItemTitle from './ItemTitle'

function Item() {

  return (<div className='container'>
    <Header/>
    <img src={require('./avengers.png')} className='item-img img-fluid bg-dark' alt='item'/>
    <ItemTitle/>
    <p>klekmebkmepiripemipbrmie</p>
    <iframe title='movie' width="420" height="345" src="https://www.youtube.com/embed/FYMl2AMdShE"></iframe>

  </div>)
}

export default Item
