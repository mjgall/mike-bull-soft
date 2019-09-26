import { Modal, Button } from 'semantic-ui-react';
import CourseForm from '../CourseForm';
import React from 'react';
import * as actions from '../../actions';
import { connect } from 'react-redux';

class AddCourseModal extends React.Component {

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

    this.props.addCourse({
      title: this.props.forms.course.title,
      language: this.props.forms.course.language,
      description: this.props.forms.course.description,
      difficulty: this.props.forms.course.difficulty,
      owner_id: this.props.auth.id
    });
    this.close();
  };

  render() {
    return (
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
    );
  }
}
const mapStateToProps = state => {
  return { auth: state.auth, app: state.app, forms: state.forms };
};

export default connect(
  mapStateToProps,
  actions
)(AddCourseModal);
