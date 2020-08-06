import React, {Fragment} from 'react'
import Header from './partials/Header'
import Carousel from './Carousel'
import Title from './Title'
import HomeGrid from './HomeGrid'
import {Button} from '@material-ui/core'

function Home(){
  let sections = ['Now Showing', 'Trending', 'News']

  return(<div className='container'>
    <Header/>
    <Carousel/>
    {sections.map((s) =>
      <Fragment key={s}>
        <Title title={s}/>
        <HomeGrid gridName={s}/>
        <Button color="primary">Show more</Button>
      </Fragment>
    )}

  </div>)
}

export default Home
