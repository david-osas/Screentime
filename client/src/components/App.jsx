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
      dispatch(handleInitial())
    }else{
      dispatch(loading(false))
    }
    console.log('i am here')
  }, [dispatch,location])

  if(load){
    return <h1>i am loading bro</h1>
  }

  return (

      <Switch>
        <Route exact path='/'>
          <Home/>
        </Route>

        <Route exact path='/now-showing'>
          <GridList place='nowShowing'/>
        </Route>

        <Route exact path='/trending-movies'>
          <GridList place='trending'/>
        </Route>

        <Route exact path='/latest-news'>
          <GridList place='news'/>
        </Route>

        <Route exact path='/item/:itemId'>
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
