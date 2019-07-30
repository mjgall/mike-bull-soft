import React from 'react';
import ReactDOM from 'react-dom';

import Entry from './components/Entry';
import Home from './components/Home';
import { Router, Route, Switch } from 'react-router-dom';
import history from './history';

import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import reduxThunk from 'redux-thunk';

import reducers from './reducers';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  reducers,
  composeEnhancers(applyMiddleware(reduxThunk))
);

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <Switch>
        <Route component={Entry} path="/" exact />
        <Route component={Home} path="/home" exact />
      </Switch>
    </Router>
  </Provider>,

  document.querySelector('#root')
);
