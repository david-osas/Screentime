import React from 'react';
import avengers from '../images/avengers.png'

function Login() {

  return (<div>
    <h4 className='logo'><span className='screentime'>Screen</span>time</h4>
    <h1 className='login-title'>Welcome to Screentime, the new frontier for movies</h1>
    <div className='login'>    
    <div className='row row-cols-1 row-cols-xl-2 row-cols-lg-2 row-cols-md-2 align-items-center'>
      <div className='col'>
        <img src={avengers} alt='login' className='login-img'/>
      </div>
      <div className='col'>
          <form>
            <div className='form-group'>
              <input type='text' className='form-control' placeholder='Username'/>
            </div>
            <div className='form-group'>
              <input type='email' className='form-control' placeholder='Email address'/>
            </div>
            <div className='form-group'>
              <input type='password' className='form-control' placeholder='Password'/>
            </div>
            <div className=' d-flex justify-content-center'>
            <button type='submit' class='btn btn-primary mr-2 login-btn'>Login</button>
            <button type='submit' class='btn btn-primary ml-2 login-btn'>Signup</button>
            </div>
          </form>
      </div>
</div>
    </div>

  </div>)
}

export default Login
