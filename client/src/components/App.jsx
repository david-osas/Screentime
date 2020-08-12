import React, {useEffect, useState} from 'react'
import {Route, Switch, useLocation, useHistory} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import Register from './Register'
import Home from './home/Home'
import GridList from './GridList'
import Item from './Item'
import '../styles.css'
import {handleInitial} from '../actions/initial'
import {loading} from '../actions/loading'

//Main app file, client side routing is programmed here
//Store data is initially set from this component, provided suitable conditions are met

function App() {
  let load = useSelector(state => state.loading)
  let [authed, setAuthed] = useState(false)
  let location = useLocation()
  let history = useHistory()

  const dispatch = useDispatch()

  useEffect(() => {
    if(location.pathname === '/register'){
      dispatch(loading(false))
    }else if(!authed){
      fetch('/server/get-user', {credentials: 'same-origin'})
      .then(response => response.json())
      .then(res => {
        if(res.feedBack === 'success'){
          dispatch(handleInitial(1))
          setAuthed(true)
        }else{
          history.push('/register')
        }
      })
    }
  }, [authed,dispatch, history, location])


  if(load){
    return <h1 className='center-text'>Loading...</h1>
  }

  return (

      <Switch>
        <Route exact path='/'>
          <Home/>
        </Route>

        <Route exact path='/now-showing/:page'>
          <GridList type='now-showing'/>
        </Route>

        <Route exact path='/trending-movies'>
          <GridList type='trending'/>
        </Route>

        <Route exact path='/latest-news'>
          <GridList type='news'/>
        </Route>

        <Route exact path='/item/:type/:itemId'>
          <Item/>
        </Route>

        <Route exact path='/register'>
          <Register />
        </Route>

        <Route>
          <h1>No match, try a different route</h1>
        </Route>
      </Switch>

  )
}

export default App
