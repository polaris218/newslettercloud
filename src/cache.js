import debounce from 'lodash/debounce'
import pick from 'lodash/pick'


const REACT_APP_CACHE_STATE_KEYS = JSON.parse(process.env.REACT_APP_CACHE_STATE_KEYS || '{}')
const state = JSON.parse(localStorage.getItem(process.env.REACT_APP_STORAGE_KEY) || '{}')

const middleware = store => next => action => {
  let result = next(action)
  let nextState = store.getState()

  cacheState(
    REACT_APP_CACHE_STATE_KEYS ? pick(nextState, REACT_APP_CACHE_STATE_KEYS) : nextState
  )

  return result
}

const cacheState = debounce(function(state) {
  localStorage.setItem(
    process.env.REACT_APP_STORAGE_KEY,
    JSON.stringify(state)
  )
})

export { middleware, state }
