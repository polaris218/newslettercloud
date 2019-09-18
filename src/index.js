import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'

import './index.scss'
import App from 'components/App'
import { store, history } from 'init'
import 'rxjs'
import 'react-toastify/dist/ReactToastify.css'
import dotenv from 'dotenv'

dotenv.config()

ReactDOM.render(
  <Provider store={store}>
    <App history={history} />
  </Provider>,
  document.getElementById('root')
)

if (process.env.NODE_ENV === 'development') {
  const registerServiceWorker = require('./registerServiceWorker').default
  registerServiceWorker()
}
