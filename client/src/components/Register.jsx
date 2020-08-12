import React, {useState} from 'react';
import {Button} from '@material-ui/core'
import {useHistory} from 'react-router-dom'
import {useDispatch} from 'react-redux'
import Logo from './partials/Logo'
import RegisterCard from './cards/RegisterCard'
import RegisterInput from './RegisterInput'
import {loading} from '../actions/loading'

//Register component used to login or signup a user
//form input UI changes if error validation is received from the server

function Register() {
  let [btnState, setBtnState] = useState(['login', 'signup'])
  let [username, setUsername] = useState('')
  let [email, setEmail] = useState('')
  let [password, setPassword] = useState('')
  let [err, setErr] = useState([false, false, false])
  let [action, setAction] = useState('login')
  let history = useHistory()
  let dispatch = useDispatch()


  function toggle(e) {
    e.preventDefault()
    setBtnState(
      btnState[0] === 'login'
      ? ['signup', 'login']
      : ['login', 'signup'])
    setEmail('')
    setPassword('')
    setUsername('')
    setErr([false, false, false])
    setAction(
      action === 'login'?
      'signup': 'login'
    )
  }

  async function submitDetails(e) {
    e.preventDefault()
    let resJson

    let fetchOptions = {
      method: 'POST',
      body: JSON.stringify({email, username, password}),
      credentials: 'same-origin',
      headers: {"Content-Type": "application/json"}
    }

    if(action === 'login'){
      let response = await fetch('/server/login', fetchOptions)
      resJson = await response.json()

    }else{
      let response = await fetch('/server/signup', fetchOptions)
      resJson = await response.json()
    }

    switch(resJson.feedBack){
      case 'both':
      setErr([true, true, false])
      break
      case 'username':
      setErr([true, false, false])
      break
      case 'email':
      setErr([false, true, false])
      break
      case 'password':
      setErr([false, false, true])
      break
      case 'success':
      dispatch(loading(true))
      history.push('/')
      break
      default:
      setErr([false, false, false])
    }
  }

  function handleUsername(e){
    setUsername(e.target.value)
  }

  function handleEmail(e){
    setEmail(e.target.value)
  }

  function handlePassword(e){
    setPassword(e.target.value)
  }

  let inputList = ['username', 'email', 'password']
  let stateNames = [username, email, password]
  let handlers = [handleUsername, handleEmail, handlePassword]

  return (<div className='register-row row'>
    <div className='col-lg-9 mb-4 mb-lg-0'>
      <RegisterCard/>
    </div>
    <div className='col-lg-3 d-flex align-items-center mb-4 mb-lg-0'>
      <div className='register-details container'>
        <h1 className='form-logo'><Logo/></h1>
        <form onSubmit={submitDetails}>

          {inputList.map((inp, index) =>
            inp !== 'username'? <RegisterInput key={inp} attr={inp} input={stateNames[index]}
              inputHandler={handlers[index]} wrong={err[index]}/>
            : action === 'login'? null
            : <RegisterInput key={inp} attr={inp} input={stateNames[index]}
              inputHandler={handlers[index]} wrong={err[index]}/>
            )}

          <Button type='submit'  variant="contained" color="primary" fullWidth>
            {btnState[0]}
          </Button>

        </form>
        <p style={{marginTop: 20}}>or
          <Button color="primary" onClick={toggle}>{btnState[1]}</Button>
        </p>
      </div>
    </div>
  </div>
  )

}

export default Register
