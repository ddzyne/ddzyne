import { combineReducers } from 'redux'
// import { routerReducer } from 'react-router-redux'
import { connectRouter } from 'connected-react-router'

import pages from './pages'
import menu from './menu'
import customposts from './customposts'
import posttags from './posttags'
import loader from './loader'
import background from './background'

export default (history) => combineReducers({
  router: connectRouter(history),
  pages,
  menu,
  customposts,
  posttags,
  loader,
  background,
})