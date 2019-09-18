import React from 'react';

import ProfileCard from './ProfileCard';
import CourseForm from './CourseForm';

import CoursesTable from './CoursesTable';

import { Grid, Modal, Button } from 'semantic-ui-react';
import { connect } from 'react-redux';
import * as actions from '../actions';

class Creator extends React.Component {
  state = { open: false };

  componentDidMount() {
    document.addEventListener("click", e => {
      if (e.target.className.indexOf("dimmer") > 0 ) {
        this.close();
      }
    })
  }

  open = () => {
    this.setState({ open: true });
  };

  close = () => {
    this.props.resetForm('forms.course', {language: 'english', difficulty: 'novice'})
    this.setState({ open: false });
  };

  submit = () => {
    console.log(this.props.forms.course)
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
          <Modal
            trigger={
              <Button onClick={this.open} positive>
                Add A Course
              </Button>
            }
            open={this.state.open}>
            <Modal.Header>Add a Course</Modal.Header>
            <Modal.Content>
              <Modal.Description>
                <CourseForm />
              </Modal.Description>
            </Modal.Content>
            <Modal.Actions>
              <Button onClick={this.close} negative>
                Cancel
              </Button>
              <Button
                onClick={this.submit}
                positive
                labelPosition="right"
                icon="checkmark"
                content="Add"
              />
            </Modal.Actions>
          </Modal>
          
          <CoursesTable />
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
