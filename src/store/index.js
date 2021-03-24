import { createStore, applyMiddleware } from 'redux'

import logger from 'redux-logger'
import thunkMiddleware from 'redux-thunk'

import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly'

import rootReducer from './reducers'

export default function configureStore(initialState) {
  const middlewares = [thunkMiddleware, logger]
  const middlewareEnhancer = applyMiddleware(...middlewares)

  const enhancers = [middlewareEnhancer]
  const composedEnhancers = composeWithDevTools(...enhancers)

  const store = createStore(rootReducer, initialState, composedEnhancers)

  return store
}
