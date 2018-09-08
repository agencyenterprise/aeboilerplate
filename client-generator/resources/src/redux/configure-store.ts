import { applyMiddleware, combineReducers, createStore } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'

import get from './ducks/get'

const ducks = combineReducers({
  get,
})

const configureStore = () => createStore(ducks, composeWithDevTools(applyMiddleware(thunk)))

export default configureStore
