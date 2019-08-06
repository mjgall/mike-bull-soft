import React from 'react';

import { connect } from 'react-redux';
import * as actions from '../actions';

import { Grid } from 'semantic-ui-react';
import Menu from './Menu';
import ProfileCard from './ProfileCard';

class Course extends React.Component {
  state = { course: null };

  componentWillMount() {
    const { course } = this.props.match.params;

    this.props.getCourse(course);
  }
  componentWillUnmount() {
    this.props.clearCourse();
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
            <ul>
              <li>ID: {this.props.app.course.course_id}</li>
              <li>Title: {this.props.app.course.title}</li>
              <li>
                Create Date:{' '}
                {new Date(
                  this.props.app.course.create_date * 1000
                ).toLocaleString()}
              </li>
            </ul>
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
