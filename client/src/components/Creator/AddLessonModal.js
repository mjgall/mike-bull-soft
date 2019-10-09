import { Modal, Button } from 'semantic-ui-react';
import LessonForm from '../LessonForm';
import React from 'react';
import * as actions from '../../actions';
import { connect } from 'react-redux';

class AddLessonModal extends React.Component {

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
    this.props.resetForm('forms.lesson', {language: 'english', difficulty: 'novice'})
    this.setState({ open: false });
  };

  submit = () => {

    this.props.addLesson();
    this.close();
  };

  render() {
    return (
      <Modal
        trigger={
          <Button onClick={this.open} positive>
            Add A Lesson
          </Button>
        }
        open={this.state.open}>
        <Modal.Header>Add a Lesson</Modal.Header>
        <Modal.Content>
          <Modal.Description>
            <LessonForm />
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
)(AddLessonModal);
