import React from 'react'
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import Register from './Register'
import Home from './home/Home'
import GridList from './GridList'
import Item from './Item'
import '../styles.css'

function App() {

  return (
    <BrowserRouter>

      <Switch>
        <Route exact path='/'>
          <Home/>
        </Route>

        <Route exact path='/now-showing'>
          <GridList/>
        </Route>

        <Route exact path='/trending-movies'>
          <GridList/>
        </Route>

        <Route exact path='/latest-news'>
          <GridList/>
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

    </BrowserRouter>
  )
}

export default App
