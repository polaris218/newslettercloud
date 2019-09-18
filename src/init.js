import 'polyfills' // should be first

import createHistory from 'history/createBrowserHistory'
import { connectRouter, routerMiddleware } from 'connected-react-router'
import { createStore, applyMiddleware, combineReducers, compose as reduxCompose } from 'redux'
import { reducer as form } from 'redux-form'
import { createEpicMiddleware, combineEpics } from 'redux-observable'
import { middleware as cacheMiddleware, state as initialState } from './cache'
import { reducers, epics } from 'store'
import { reducer as resource, epic as resourceEpic } from 'common/utils/resource'
import API, { configure as configureAPI } from 'api'

const epicMiddleware = createEpicMiddleware(resourceEpic, { dependencies: { API }})

const history = createHistory()

// support for redux dev tools
const compose = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || reduxCompose

const store = createStore(
  combineReducers({
    router: connectRouter(history),
    form,
    resource,
    ...reducers,
  }),
  initialState,
  compose(
    applyMiddleware(
      epicMiddleware,
      cacheMiddleware,
      routerMiddleware(history),
    )
  )
)


configureAPI(store)

export {
  store, history,
}
