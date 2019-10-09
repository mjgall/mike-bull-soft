import { Modal, Button } from 'semantic-ui-react';
import CourseForm from '../CourseForm';
import React from 'react';
import * as actions from '../../actions';
import { connect } from 'react-redux';

class EditCourseModal extends React.Component {
  state = { open: false, isSubmitting: false };

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

  updateParent() {
    this.props.toggleShowModalCallback();
  }

  submit = async () => {
    this.setState({ isSubmitting: true });
    await this.props.editCourse({
      title: this.props.forms.course.title,
      language: this.props.forms.course.language,
      description: this.props.forms.course.description,
      difficulty: this.props.forms.course.difficulty,
      owner_id: this.props.auth.google_id,
      id: this.props.courseId
    });
    this.updateParent();
    this.setState({ isSubmitting: false });
    this.close();
  };

  render() {
    return (
      <Modal
        trigger={<Button icon="pencil" onClick={this.open}></Button>}
        open={this.state.open}>
        <Modal.Header>Edit Course</Modal.Header>
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
          {this.state.isSubmitting ? (
            <Button loading positive>
              Loading
            </Button>
          ) : (
            <Button
              onClick={this.submit}
              positive
              labelPosition="right"
              icon="checkmark"
              content="Edit"
            />
          )}
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
