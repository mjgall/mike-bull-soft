import React from 'react';
import Entry from './Entry';
import Home from './Home';
import Course from './Course';
import * as actions from '../actions';
import { Router, Route, Switch } from 'react-router-dom';
import history from '../history';
import { connect } from 'react-redux';
import Menu from './Menu';


class App extends React.Component {
  render() {
    return (
      <Router history={history}>
        <Menu />
        <Switch>
          <Route component={Entry} path="/" exact />
          <Route component={Home} path="/home" exact />
          <Route component={Course} path="/course/:course" exact />
        </Switch>
      </Router>
    );
  }
}

const mapStateToProps = state => {
  return { auth: state.auth, app: state.app };
};

export default connect(
  mapStateToProps,
  actions
)(App);
