import React from 'react';

import ProfileCard from '../ProfileCard';
import CoursesTable from '../CoursesTable';

import { Grid } from 'semantic-ui-react';
import { connect } from 'react-redux';
import * as actions from '../../actions';

class Student extends React.Component {
  componentDidMount() {
    this.props.setStudentMode();
  }

  render() {
    return (
      <React.Fragment>
        <Grid.Column width={4}>
          <ProfileCard />
        </Grid.Column>
        <Grid.Column width={12}>
          <h2>Available Courses</h2>
          <CoursesTable renderLocation={this.props.match.url}/>
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
)(Student);
