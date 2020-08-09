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
  let location = useLocation()

  const dispatch = useDispatch()

  useEffect(() => {
    if(location.pathname !== '/register'){
      let path = location.pathname.split('/')
      if(path[2] === 'nowShowing'){
        dispatch(handleInitial(path[3]))
      }else if(path[1] === 'now-showing'){
        dispatch(handleInitial(path[2]))
      }
      else{
        dispatch(handleInitial(1))
      }
    }else{
      dispatch(loading(false))
    }
  }, [location,dispatch])


  if(load){
    return <h1>i am loading bro</h1>
  }

  return (

      <Switch>
        <Route exact path='/'>
          <Home/>
        </Route>

        <Route exact path='/now-showing/:page'>
          <GridList type='nowShowing'/>
        </Route>

        <Route exact path='/trending-movies'>
          <GridList type='trending'/>
        </Route>

        <Route exact path='/latest-news'>
          <GridList type='news'/>
        </Route>

        <Route exact path='/item/:type/:page/:itemId'>
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
