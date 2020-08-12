import {combineReducers} from 'redux'
import {nowShowing, trending, platforms} from './movies'
import {news} from './news'
import {loading} from './loading'

//combines all store reducers into one object

export default combineReducers({nowShowing, trending, platforms, news, loading})
