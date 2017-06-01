import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'

let middlewares = [thunkMiddleware]

if (JSON.stringify(process.env.NODE_ENV) === '"development"') {
  /**
   * 1. https://github.com/reactjs/redux/issues/581#issuecomment-133187076
   * 2. https://github.com/erikras/react-redux-universal-hot-example/commit/f0d0211cc868ebca39381a4f0fe9e0b4c31cc1c6#commitcomment-12167595
   * 3. https://github.com/eslint/espree/issues/124#issuecomment-151001677
   * 4. http://redux.js.org/docs/api/applyMiddleware.html
   */
  let loggerMiddleware = require('redux-logger')
  middlewares = [...middlewares, loggerMiddleware()]
}

import todoReducers from '../reducers'

export default createStore(
  todoReducers,
  applyMiddleware(...middlewares)
)
