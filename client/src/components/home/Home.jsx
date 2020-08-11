import React, {Fragment} from 'react'
import {Button} from '@material-ui/core'
import {Link} from 'react-router-dom'
import Header from '../partials/Header'
import Footer from '../partials/Footer'
import Carousel from '../carousel/Carousel'
import Title from './Title'
import HomeGrid from './HomeGrid'

function Home(){
  let sections = ['Now Showing', 'Trending', 'News']
  let secLinks = ['/now-showing/1', '/trending-movies', '/latest-news']

  return(<div className='container'>
    <Header/>
    <Carousel/>
    {sections.map((s,i) =>
      <Fragment key={s}>
        <Title title={s}/>
        <HomeGrid gridName={s}/>
        <Link to={secLinks[i]}><Button color="primary">Show more</Button></Link>
      </Fragment>
    )}
    <Footer/>
  </div>)
}

export default Home
