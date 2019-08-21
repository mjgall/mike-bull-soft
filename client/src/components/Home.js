import React from 'react';

import CoursesTable from './CoursesTable';
import ProfileCard from './ProfileCard';
import CourseForm from './CourseForm';
import Student from './Student';
import { Grid } from 'semantic-ui-react';
import { connect } from 'react-redux';
import * as actions from '../actions';
import Creator from './Creator';

class Home extends React.Component {
  renderStudentOrCreator = () => {
    if (this.props.app.creatorMode) {
      return <Creator />;
    } else {
      return <Student />;
    }
  };

  render() {
    return this.renderStudentOrCreator();
  }
}

const mapStateToProps = state => {
  return { auth: state.auth, app: state.app };
};

export default connect(
  mapStateToProps,
  actions
)(Home);
