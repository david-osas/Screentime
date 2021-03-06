import React from 'react'
import {TextField} from '@material-ui/core'

//Form input component for the register component

function RegisterInput(props){

  return(
    <div className='form-group'>
      <TextField required fullWidth name={props.attr} type={props.attr} label={props.attr} variant = 'outlined'
        value = {props.input} onChange={props.inputHandler}
      error= {props.wrong} helperText= {props.wrong && 'invalid '+props.attr}/>
    </div>
  )
}

export default RegisterInput
