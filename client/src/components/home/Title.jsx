import React from 'react'

//Title component used to show title of each section in the home page

function Title(props){

  return (
    <>
    <h1 style={{marginTop: 50}} id={props.title} >{props.title}</h1>
    <hr align='left' className='home-rule'/>
    </>
  )
}

export default Title
