import {combineReducers} from 'redux'
import {nowShowing, trending, platforms} from './movies'
import {news} from './news'
import {loading} from './loading'


export default combineReducers({nowShowing, trending, platforms, news, loading})
