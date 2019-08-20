import React from 'react';

import CoursesTable from './CoursesTable';
import ProfileCard from './ProfileCard';
import CourseForm from './CourseForm';
import { Grid } from 'semantic-ui-react';
import { connect } from 'react-redux';
import * as actions from '../actions';

class Home extends React.Component {
  render() {
    return (
      <React.Fragment>
        <Grid.Column width={6}>
          <ProfileCard />
        </Grid.Column>
        <Grid.Column width={10}>
          <CourseForm />
          <h2>Courses</h2>
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
)(Home);
