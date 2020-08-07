import React, {useState} from 'react';
import {Button} from '@material-ui/core'
import {useHistory} from 'react-router-dom'
import Logo from './partials/Logo'
import RegisterCard from './cards/RegisterCard'
import RegisterInput from './RegisterInput'

function Register() {
  let [btnState, setBtnState] = useState(['login', 'signup'])
  let [username, setUsername] = useState('')
  let [email, setEmail] = useState('')
  let [password, setPassword] = useState('')
  let [err, setErr] = useState([false, false])
  let [action, setAction] = useState('login')
  let history = useHistory()


  function toggle(e) {
    e.preventDefault()
    setBtnState(
      btnState[0] === 'login'
      ? ['signup', 'login']
      : ['login', 'signup'])
    setEmail('')
    setPassword('')
    setUsername('')
    setErr([false, false])
    setAction(
      action === 'login'?
      'signup': 'login'
    )
  }

  function submitDetails(e) {
    e.preventDefault()
    // let response = 'both'
    // switch(response){
    //   case 'both':
    //   setErr([true, true])
    //   break
    //   case 'username':
    //   setErr([true, false])
    //   break
    //   case 'email':
    //   setErr([false, true])
    //   break
    //   default:
    //   setErr([false, false])
    // }
    history.push('/')
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
