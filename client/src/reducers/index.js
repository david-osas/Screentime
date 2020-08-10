import {combineReducers} from 'redux'
import {nowShowing, trending, platforms} from './movies'
import {news} from './news'
import {loading} from './loading'
import {authed} from './authed'


export default combineReducers({nowShowing, trending, platforms, news, loading, authed})
