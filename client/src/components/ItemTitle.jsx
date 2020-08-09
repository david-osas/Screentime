import React from 'react'

function ItemTitle(props){

  return (
    <>
    <h1 className='item-title'> {props.title.toUpperCase()} </h1>
    <hr className='item-rule'/>
    </>
  )
}

export default ItemTitle
