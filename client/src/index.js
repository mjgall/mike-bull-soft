import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import { Router, Route, Switch } from 'react-router-dom';
import history from './history';

ReactDOM.render(
  <Router history={history}>
    <Switch>
      <Route component={App} path="/" exact></Route>
    </Switch>

  </Router>,
  document.querySelector('#root')
);
