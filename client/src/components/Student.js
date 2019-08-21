import React from 'react';

import ProfileCard from './ProfileCard';

import { Grid } from 'semantic-ui-react';
import { connect } from 'react-redux';
import * as actions from '../actions';

class Student extends React.Component {
  render() {
    return (
      <React.Fragment>
        <Grid.Column width={6}>
          <ProfileCard />
        </Grid.Column>
        <Grid.Column width={10}>
          <h2>Student Mode</h2>
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
