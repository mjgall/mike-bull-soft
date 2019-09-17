import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';

import CreatorCourse from './CreatorCourse';
import StudentCourse from './StudentCourse';


class Course extends React.Component {
 
  render() {
    if (this.props.app.creatorMode) {
      return <CreatorCourse courseId={this.props.match.params.course}></CreatorCourse>;
    } else {
      return <StudentCourse courseId={this.props.match.params.course}></StudentCourse>;
    }
  }
}

const mapStateToProps = state => {
  return {
    auth: state.auth,
    app: state.app,
  };
};

export default connect(
  mapStateToProps,
  actions
)(Course);
