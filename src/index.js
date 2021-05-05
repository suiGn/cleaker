import React from 'react'
import ReactDOM from 'react-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import './assets/scss/Index.scss'
import App from './App'
import * as serviceWorker from './serviceWorker'
import { Container } from 'reactstrap';

import { Provider } from "react-redux"
import store from './Store'

ReactDOM.render(
    <Provider store={store}>
      <Container className="themed-container principal-view" fluid="sm">
          <App />
      </Container>
    </Provider>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
