import { createStore, compose, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import {indexReducer} from '../reducers/indexReducer'

const store = createStore(
  indexReducer,
  composeWithDevTools(applyMiddleware(thunk))
)

export default store