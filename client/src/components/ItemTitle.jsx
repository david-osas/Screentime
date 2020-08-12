import React from 'react'

//Title component used in item component to render names to movies

function ItemTitle(props){

  return (
    <>
    <h1 className='item-title'> {props.title.toUpperCase()} </h1>
    <hr className='item-rule'/>
    </>
  )
}

export default ItemTitle
