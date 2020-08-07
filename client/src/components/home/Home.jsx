import React, {Fragment} from 'react'
import Header from '../partials/Header'
import Carousel from '../carousel/Carousel'
import Title from './Title'
import HomeGrid from './HomeGrid'
import {Button} from '@material-ui/core'

function Home(){
  let sections = ['Now Showing', 'Trending', 'News']
  let secLinks = ['/now-showing', '/trending-movies', '/latest-news']

  return(<div className='container'>
    <Header/>
    <Carousel/>
    {sections.map((s,i) =>
      <Fragment key={s}>
        <Title title={s}/>
        <HomeGrid gridName={s}/>
        <Button href={secLinks[i]} color="primary">Show more</Button>
      </Fragment>
    )}

  </div>)
}

export default Home
