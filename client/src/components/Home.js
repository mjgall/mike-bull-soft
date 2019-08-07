import React from 'react';

import CoursesTable from './CoursesTable';
import ProfileCard from './ProfileCard';
import { Grid } from 'semantic-ui-react';
import { connect } from 'react-redux';
import * as actions from '../actions';

class Home extends React.Component {
  componentWillMount() {
    this.props.fetchUser();
    this.props.clearCourse();
  }

  render() {
    return (
      <React.Fragment>

        <Grid container columns={16} style={{ marginTop: '2em' }}>
          <Grid.Column width={6}>
            <ProfileCard />
          </Grid.Column>
          <Grid.Column width={10}>
            <CoursesTable />
          </Grid.Column>
        </Grid>
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
