import {setNowShowing, setTrending} from './movies'
import {setNews} from './news'
import {loading} from './loading'

export function handleInitial(){
  return async (dispatch) => {
    await dispatch(setNowShowing(1))
    await dispatch(setTrending())
    await dispatch(setNews())
    await dispatch(loading(false))
    console.log('i am done')
  }
}
