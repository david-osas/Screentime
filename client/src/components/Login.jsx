import React from 'react';
import {TextField, Button, Grid} from '@material-ui/core'

function Login(){
  let inputs = ['email', 'password']

  return (
    <div>
      <Grid className='login-grid' container spacing={3} >

        <Grid className='login-image' item md={6} sm={12}>

        </Grid>
        <Grid item md={6} sm={12}>
          <form>
            {inputs.map((i) =>
              <>
              <TextField className='login-details' required id={i} type={i} label={i} variant='outlined' margin='dense' name={i}/>
              <br/>
              </>
            )}
            <Button className='login-details' variant="contained" color="primary" disableElevation>
              Login
            </Button>

          </form>
          <p>or <Button color="primary">signup</Button></p>
        </Grid>

      </Grid>
    </div>
  )
}

export default Login
