import React from 'react';

import Student from './Student/Student';
import Login from './Login';

import { connect } from 'react-redux';
import * as actions from '../actions';
import Creator from './Creator/Creator';

class Home extends React.Component {
  renderStudentOrCreator = () => {
    if (this.props.app.creatorMode) {
      return <Creator history={this.props.history}/>;
    } else {
      return <Student history={this.props.history}/>;
    }
  };

  render() {
    return this.props.auth ? this.renderStudentOrCreator() : <Login></Login>;
  }
}

const mapStateToProps = state => {
  return { auth: state.auth, app: state.app };
};

export default connect(
  mapStateToProps,
  actions
)(Home);
