import 'babel-polyfill'
import React from 'react'
import ReactDOM from 'react-dom'
import {Provider} from 'react-redux'
import PropTypes from 'prop-types'

import MainWrapper from './components/main/mainWrapper'

import store from './store/store'

Provider.childContextTypes = {
  store: PropTypes.object,
  storeSubscription: PropTypes.func
}

ReactDOM.render(
  <Provider store={store}>
    <MainWrapper/>
  </Provider>,
  document.getElementById('root')
)