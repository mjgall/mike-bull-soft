import React from 'react';

import { connect } from 'react-redux';
import * as actions from '../actions';

import { Grid } from 'semantic-ui-react';

import ProfileCard from './ProfileCard';

class Course extends React.Component {
  state = { course: null };

  async componentWillMount() {
    const { course } = this.props.match.params;
    await this.props.fetchCourses();
    await this.props.fetchUser();
    this.props.getCourse(course); 
  }

  render() {
    return (
      <React.Fragment>
        
          <Grid.Column width={6}>
            <ProfileCard />
          </Grid.Column>
          <Grid.Column width={10}>
            <ul>
              <li>
                ID:{' '}
                {this.props.app.course
                  ? this.props.app.course.course_id
                  : null}
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
