import React from 'react';

import { connect } from 'react-redux';
import * as actions from '../../actions';

import { Switch, Route } from 'react-router-dom';
import CreatorCourse from './CreatorCourse';
import CreatorHome from './CreatorHome';
import CreatorSymbol from './CreatorSymbol';

class Creator extends React.Component {
  componentDidMount() {
    this.props.setCreatorMode();
  }

  routes = () => {
    return (
      <Switch>
        <Route
          exact
          path={`${this.props.match.url}/`}
          component={CreatorHome}></Route>
        <Route
          exact
          path={`${this.props.match.url}/course/:id`}
          component={CreatorCourse}></Route>
        <Route
          exact
          path={`${this.props.match.url}/symbol/:id`}
          component={CreatorSymbol}></Route>
      </Switch>
    );
  };

  render() {
    return this.routes();
  }
}

const mapStateToProps = state => {
  return { auth: state.auth, app: state.app, forms: state.forms };
};

export default connect(
  mapStateToProps,
  actions
)(Creator);
