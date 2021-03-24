import React from 'react';
import ReactDOM from 'react-dom'
import './index.scss'
import { Board } from './components/board'
import configureStore from './store'
import { Provider } from 'react-redux'

const store = configureStore()

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Board />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
)
