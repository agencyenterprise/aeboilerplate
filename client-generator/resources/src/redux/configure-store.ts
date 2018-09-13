import { applyMiddleware, combineReducers, createStore } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'

import { authentication } from './ducks/authenticate'
import get from './ducks/get'

const ducks = combineReducers({
  authentication,
  get,
})

const configureStore = () => createStore(ducks, composeWithDevTools(applyMiddleware(thunk)))

export { configureStore }
