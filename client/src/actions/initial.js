import {setNowShowing, setTrending} from './movies'
import {setNews} from './news'
import {loading} from './loading'

export function handleInitial(page){
  return async (dispatch) => {
    await dispatch(setNowShowing(page))
    await dispatch(setTrending())
    await dispatch(setNews())
    await dispatch(loading(false))
    console.log('i am done setting up store')
  }
}
