import React from 'react';
import ReactDOM from 'react-dom';

import { createStore, applyMiddleware, compose } from 'redux';
import reduxThunk from 'redux-thunk';
import { Provider } from 'react-redux';
import * as Sentry from '@sentry/browser';

import reducers from './reducers';

import App from './components/App';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;


const store = createStore(
  reducers,
  composeEnhancers(applyMiddleware(reduxThunk))
);

//only log client errors to Sentry in production
if (!window.location.hostname === 'localhost') {
  Sentry.init({dsn: "https://5e64d4e6c3fe4941b5ec0e23263d760e@sentry.io/1880615"});
}

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.querySelector('#root')
);
