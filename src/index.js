import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'

import { Game } from './components/game'
import configureStore from './store'
import './index.scss'

const store = configureStore()

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Game />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
)
