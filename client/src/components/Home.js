import React from 'react';
import Menu from './Menu';
import CoursesTable from './CoursesTable';
import ProfileCard from './ProfileCard';
import { Grid } from 'semantic-ui-react';
import { connect } from 'react-redux';
import * as actions from '../actions';

class Home extends React.Component {
  componentWillMount() {
    this.props.fetchUser();
  }

  render() {
    return (
      <React.Fragment>
        <Menu loggedIn user={this.props.auth} />
        <Grid container columns={16} style={{ paddingTop: '4em' }}>
          <Grid.Column width={6}>
            <ProfileCard  />
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
