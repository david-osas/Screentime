import React from 'react'
import FacebookIcon from '@material-ui/icons/Facebook'
import InstagramIcon from '@material-ui/icons/Instagram'
import TwitterIcon from '@material-ui/icons/Twitter'
import YouTubeIcon from '@material-ui/icons/YouTube'
import FavoriteIcon from '@material-ui/icons/Favorite';
import Logo from './Logo'

//Footer component 

function Footer() {

  return (<footer className='mt-3 p-4 bg-light'>
    <div className='row row-cols-1 row-cols-md-2'>
      <div className='col mb-3'>
        <h4><Logo/></h4>
      </div>

      <div className='col mb-3'>
        <div className='d-flex justify-content-md-end'>
          <InstagramIcon/>
          <TwitterIcon/>
          <FacebookIcon/>
          <YouTubeIcon/>
        </div>
      </div>
    </div>
    <p className='d-flex justify-content-md-center'>Made with <FavoriteIcon className='heart'/> by Osas</p>

  </footer>)
}

export default Footer
