import React from 'react';

import ProfileCard from './ProfileCard';
import CourseForm from './CourseForm';

import CoursesTable from './CoursesTable';

import { Grid } from 'semantic-ui-react';
import { connect } from 'react-redux';
import * as actions from '../actions';

class Creator extends React.Component {
  render() {
    console.log("We made it here")
    return (
      <React.Fragment>
        <Grid.Column width={6}>
          <ProfileCard />
        </Grid.Column>
        <Grid.Column width={10}>
          <CourseForm />
          <h2>My Created Courses</h2>
          <CoursesTable />
        </Grid.Column>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return { auth: state.auth };
};

export default connect(
  mapStateToProps,
  actions
)(Creator);
