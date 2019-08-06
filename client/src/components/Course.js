import React from 'react';

import { connect } from 'react-redux';
import * as actions from '../actions';

import { Grid } from 'semantic-ui-react';
import Menu from './Menu';
import ProfileCard from './ProfileCard';

class Course extends React.Component {
  state = { course: null };

  componentWillMount() {
    this.props.fetchUser();
  }

  componentDidMount() {
    const { course } = this.props.match.params;
    //fetch course information
    this.setState({ course });
  }

  render() {
    return (
      <React.Fragment>
        <Menu user={this.props.auth} />
        <Grid container columns={16} style={{ marginTop: '2em' }}>
          <Grid.Column width={6}>
            <ProfileCard />
          </Grid.Column>
          <Grid.Column width={10}>
            <div>Hello this is a course, and its id is {this.state.course}</div>
          </Grid.Column>
        </Grid>
      </React.Fragment>
    );
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
)(Course);
