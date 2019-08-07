import React from 'react';

import CoursesTable from './CoursesTable';
import ProfileCard from './ProfileCard';
import { Grid } from 'semantic-ui-react';
import { connect } from 'react-redux';
import * as actions from '../actions';

class Home extends React.Component {
  render() {
    return (
      <React.Fragment>
        <Grid.Column width={6} style={{overflow: "initial"}}>
          <ProfileCard />
        </Grid.Column>
        <Grid.Column width={10}>
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
