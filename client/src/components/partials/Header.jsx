import React, {useState, useEffect} from 'react'
import {TextField, Button, IconButton} from '@material-ui/core'
import {Link} from 'react-router-dom'
import {useHistory} from 'react-router-dom'
import AccountCircleIcon from '@material-ui/icons/AccountCircle'
import Logo from './Logo'


function Header() {

  let navTitles = ['Now Showing', 'Trending', 'News']
  let navLinks = ['/now-showing/1', '/trending-movies', '/latest-news']
  let [search, setSearch] = useState('')
  let [err, setErr] = useState(false)
  let [user, setUser] = useState('')
  let history = useHistory()

  function handleSearch(e){
    setSearch(e.target.value)
  }

  function logout(){
    console.log('osas')
    fetch('http://localhost:5000/server/logout', {method: 'DELETE', credentials: 'include'})
    .then(response => response.json())
    .then(res => {
      if(res.feedBack === 'success'){
        history.push('/register')
      }
    })
  }

  async function startSearch(e){
    e.preventDefault()
    let fetchOptions = {
      method: 'POST',
      body: JSON.stringify({movie: search}),
      headers: {"Content-Type": "application/json"}
    }
    let response = await fetch('http://localhost:5000/server/search-movie', fetchOptions)
    let res = await response.json()
    if(res.feedBack){
      setErr(true)
    }else if(res.result){
      const path = '/item/now-showing/'+res.result.id
      history.push(path, {result: res.result})
    }
  }

  useEffect(() => {
    fetch('http://localhost:5000/server/get-user', {credentials: 'include'})
    .then(response => response.json())
    .then(res => {
      setUser(res.username[0].toUpperCase()+res.username.slice(1))
    })
  },[])

  return (<nav className="navbar navbar-expand-lg navbar-light bg-light mb-3">
    <Link className="navbar-brand" to='/'>
      <h4> <Logo/> </h4>
    </Link>
    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>

    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav mr-auto">
        {
          navTitles.map((n,i) => <li key={n} className="nav-item">
            <Link to={navLinks[i]} className="nav-link">{n}</Link>
          </li>)
        }
      </ul>
      <form className="form-inline my-2 my-lg-0" onSubmit={startSearch}>
        <TextField required id='search' type="search" className="form-control mr-sm-2 "
          variant='outlined' margin='dense' placeholder="Search now showing"
        value={search} onChange={handleSearch}
        error={err} helperText={err && 'No result found'}/>
        <Button type="submit" variant="contained" color="primary" disableElevation>Search</Button>
      </form>
      <div className='dropdown'>
        <IconButton color='primary' aria-label='user account' className='dropdown-toggle'
          id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          <AccountCircleIcon fontSize='large'  className='dropdown'/>
        </IconButton>
        <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
          <p className="dropdown-item">Hello {user}</p>
          <div className="dropdown-divider"></div>
          <Button className='dropdown-item' onClick={logout}>Log out</Button>
        </div>
      </div>

    </div>
  </nav>)
}

export default Header;
