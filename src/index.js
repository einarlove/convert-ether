import React from 'react'
import Application from './components/Application'
import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import { Provider } from 'react-redux'
import * as reducers from './reducers'
import thunk from 'redux-thunk'

const composeStore = compose(
  applyMiddleware(thunk),
  createStore,
)

const store = composeStore(combineReducers(reducers))

React.render((
  <Provider store={store}>
    {() => <Application />}
  </Provider>
  ), document.body)
