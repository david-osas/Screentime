import React, {useState} from 'react';
import {TextField, Button, Grid, FormControl} from '@material-ui/core'


function Register(){
  let [inputs, setInputs] = useState(['email', 'password'])
  let [btnState, setBtnState] = useState(['login','signup'])
  let [response, setResponse] = useState('')

  function toggle(e){
    e.preventDefault()
    setInputs(btnState[0] === 'login'? ['username', 'email', 'password'] : ['email', 'password'])
    setBtnState(btnState[0] === 'login'? ['signup','login'] : ['login','signup'])
    setResponse('')
  }

  function submit(e){
    //e.preventDefault()
    setResponse('password')
  }

  return (
      <div >
      <Grid className='login-grid' container >

        <Grid className='login-image' item md={9} sm={12}>
          <h1 className='login-image-details'>Welcome to the new frontier of movies</h1>
        </Grid>
        <Grid item className='grid-form' md={3} sm={12}>
          <h1 className='form-logo'><span style={{color: '#ff4800'}}>Screen</span>time</h1>

          <form>
          <FormControl fullWidth>
            {inputs.map((i) =>
              <>
              <TextField className='login-details' name={i}
                key={i} type={i} label={i}
                variant='outlined' margin='dense'

                error = {response === 'both'?
                true: response === i?
                true: false}

                helperText = {response === 'both'?
                'invalid '+i: response === i?
                'invalid '+i: ''}
                required = {true}/>
              <br/>
              </>
            )}
            <Button type = 'submit' onSubmit={submit} className='login-details' variant="contained" color="primary" disableElevation>
              {btnState[0]}
            </Button>
          </FormControl>
          </form>
          <p >or <Button color="primary" onClick={toggle}>{btnState[1]}</Button></p>
        </Grid>

      </Grid>
      </div>

  )
}

export default Register
