import {setNowShowing, setTrending} from './movies'
import {setNews} from './news'
import {loading} from './loading'

//action creator to set up store with initial data

export function handleInitial(page){
  return async (dispatch) => {
    await dispatch(setNowShowing(page))
    await dispatch(setTrending())
    await dispatch(setNews())
    await dispatch(loading(false))
    console.log('i am done setting up store')
  }
}
