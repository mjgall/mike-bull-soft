import React from 'react';

import { connect } from 'react-redux';
import * as actions from '../actions';

import { Grid } from 'semantic-ui-react';

import ProfileCard from './ProfileCard';

class Course extends React.Component {
  componentDidMount() {
    this.props.getCourse(this.props.match.params.course);
  }

  componentWillUnmount() {
    this.props.clearCourse();
  }

  render() {
    return (
      <React.Fragment>
        <Grid.Column width={6} style={{overflow: "initial"}}>
          <ProfileCard />
        </Grid.Column>
        <Grid.Column width={10}>
          <ul>
            <li>
              ID:{' '}
              {this.props.app.course ? this.props.app.course.course_id : null}
            </li>
            <li>
              Title:{' '}
              {this.props.app.course ? this.props.app.course.title : null}
            </li>
            <li>
              Create Date:{' '}
              {this.props.app.course
                ? new Date(
                    this.props.app.course.create_date * 1000
                  ).toLocaleString()
                : null}
            </li>
          </ul>
        </Grid.Column>
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
