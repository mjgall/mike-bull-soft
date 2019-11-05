import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';
import LessonsTableDnd from './LessonsTableDnd';

class LessonsTable extends React.Component {

  render() {
    return <LessonsTableDnd location={this.props.location} lessons={this.props.lessons} course={this.props.course}></LessonsTableDnd>;
  }
}

const mapStateToProps = state => {
  return {
    auth: state.auth,
    app: state.app
  };
};

export default connect(
  mapStateToProps,
  actions
)(LessonsTable);
