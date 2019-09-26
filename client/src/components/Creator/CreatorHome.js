import React from 'react';

import ProfileCard from '../ProfileCard';

import CoursesTable from '../CoursesTable';

import { Grid } from 'semantic-ui-react';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import AddCourseModal from './AddCourseModal';

class Creator extends React.Component {
  state = { open: false };

  componentDidMount() {
    this.props.setCreatorMode();
    this.props.history.push('/creator');
    document.addEventListener('click', e => {
      if (e.target.className.indexOf('dimmer') > 0) {
        this.close();
      }
    });
  }

  open = () => {
    this.setState({ open: true });
  };

  close = () => {
    this.props.resetForm('forms.course', {
      language: 'english',
      difficulty: 'novice'
    });
    this.setState({ open: false });
  };

  submit = () => {
    this.props.addCourse({
      title: this.props.forms.course.title,
      language: this.props.forms.course.language,
      description: this.props.forms.course.description,
      difficulty: this.props.forms.course.difficulty,
      owner_id: this.props.auth.google_id
    });
    this.close();
  };

  render() {
    return (
      <React.Fragment>
        <Grid.Column width={4}>
          <ProfileCard />
        </Grid.Column>
        <Grid.Column width={12}>
          <h2>My Created Courses</h2>
          <AddCourseModal></AddCourseModal>
          <CoursesTable renderLocation={this.props.match.url} />
        </Grid.Column>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return { auth: state.auth, app: state.app, forms: state.forms };
};

export default connect(
  mapStateToProps,
  actions
)(Creator);
