import React, {useEffect} from 'react'
import {Route, Switch, useLocation} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import Register from './Register'
import Home from './home/Home'
import GridList from './GridList'
import Item from './Item'
import '../styles.css'
import {handleInitial} from '../actions/initial'
import {loading} from '../actions/loading'

function App() {
  let load = useSelector(state => state.loading)
  let authed = useSelector(state => state.authed)
  let location = useLocation()

  const dispatch = useDispatch()

  useEffect(() => {
    if(authed){
      dispatch(handleInitial(1))
    }else if(location.pathname === '/register'){
      dispatch(loading(false))
    }
  }, [authed,dispatch])


  if(load){
    return <h1 className='loading'>Loading...</h1>
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
          <h1>No match bro</h1>
        </Route>
      </Switch>

  )
}

export default App
