import React from 'react'
import Logo from './Logo'
import {TextField, Button} from '@material-ui/core'

function Header() {

  let navLinks = ['Now Showing', 'Trending', 'News']

  return (<nav className="navbar navbar-expand-lg navbar-light bg-light">
    <a className="navbar-brand" >
      <h4> <Logo/> </h4>
    </a>
    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>

    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav mr-auto">
        {
          navLinks.map((n) => <li key={n} className="nav-item">
            <a className="nav-link">{n}</a>
          </li>)
        }
      </ul>
      <form className="form-inline my-2 my-lg-0">
        <TextField id='search' type="search" className="form-control mr-sm-2 "
          variant='outlined' margin='dense' placeholder="Search now showing"/>
        <Button type="submit" variant="contained" color="primary" disableElevation>Search</Button>
      </form>
    </div>
  </nav>)
}

export default Header;
 /* <li className="nav-item dropdown">
  <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
    Dropdown
  </a>
  <div className="dropdown-menu" aria-labelledby="navbarDropdown">
    <a className="dropdown-item" href="#">Action</a>
    <a className="dropdown-item" href="#">Another action</a>
    <div className="dropdown-divider"></div>
    <a className="dropdown-item" href="#">Something else here</a>
  </div>
</li> */