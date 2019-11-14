import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';
import './utils/css';

import * as serviceWorker from './serviceWorker';
import { history } from './utils/history';

// Redux
import { Provider } from 'react-redux';

// configureStore 
import configureStore from './store';

// Routing Wrapper
import { Router } from "react-router-dom";

const store = configureStore();

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <App />
    </Router>
  </Provider>
  , document.getElementById('root'));

serviceWorker.unregister();
