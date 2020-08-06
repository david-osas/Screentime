import React from 'react'
import {TextField} from '@material-ui/core'

function RegisterInput(props){

  return(
    <div className='form-group'>
      <TextField required fullWidth name={props.attr} type={props.attr} label={props.attr} variant = 'outlined'
        value = {props.input} onChange={props.inputHandler}
      error= {props.wrong} helperText= {props.wrong && 'invalid email'}/>
    </div>
  )
}

export default RegisterInput
