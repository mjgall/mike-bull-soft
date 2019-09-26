import { Modal, Button } from 'semantic-ui-react';
import CourseForm from '../CourseForm';
import React from 'react';
import * as actions from '../../actions';
import { connect } from 'react-redux';

class EditCourseModal extends React.Component {
  state = { open: false };

  componentDidMount() {
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
    this.props.editCourse({
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
      <Modal
        trigger={
          <Button onClick={this.open} positive>
            Edit Course
          </Button>
        }
        open={this.state.open}>
        <Modal.Header> Edit Course</Modal.Header>
        <Modal.Content>
          <Modal.Description>
            <CourseForm
              editing
              title={this.props.title}
              description={this.props.description}
              difficulty={this.props.difficulty}
              language={this.props.language}
            />
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
            content="Edit"
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
)(EditCourseModal);
