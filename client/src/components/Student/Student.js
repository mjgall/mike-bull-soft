import React from 'react';

import { connect } from 'react-redux';
import * as actions from '../../actions';

import { Switch, Route } from 'react-router-dom';

import StudentHome from './StudentHome';
import StudentCourse from './StudentCourse';

import StudentSymbol from './StudentSymbol';

class Student extends React.Component {
  componentDidMount() {
    this.props.setStudentMode();
  }

  routes = () => {
    return (
      <Switch>
        <Route
          exact
          path={`${this.props.match.url}/`}
          component={StudentHome}></Route>
        <Route
          exact
          path={`${this.props.match.url}/course/:id`}
          component={StudentCourse}></Route>
        <Route
          exact
          path={`${this.props.match.url}/symbol/:id`}
          component={StudentSymbol}></Route>
      </Switch>
    );
  };

  render() {
    return this.routes();
  }
}

const mapStateToProps = state => {
  return { auth: state.auth };
};

export default connect(
  mapStateToProps,
  actions
)(Student);
