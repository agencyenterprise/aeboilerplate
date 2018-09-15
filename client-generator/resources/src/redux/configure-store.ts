import { applyMiddleware, combineReducers, createStore } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'

import { authentication } from './ducks/authenticate'
import { fetchMe } from './ducks/get-me'

const ducks = combineReducers({
  authentication,
  fetchMe,
})

const configureStore = () => createStore(ducks, composeWithDevTools(applyMiddleware(thunk)))

export { configureStore }
