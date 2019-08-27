import React from 'react';
import { Control, Form } from 'react-redux-form';
import { Button, Form as SemanticForm } from 'semantic-ui-react';
import { connect } from 'react-redux';
import * as actions from '../actions';

class CourseForm extends React.Component {
  addCourse = course => {
    this.props.addCourse({
      title: course.title,
      owner_id: this.props.auth.google_id
    });
  };

  handleSubmit(course) {
    this.addCourse(course);
  }

  courseTitle = props => {
    return (
      <SemanticForm>
      <SemanticForm.Group>
        <SemanticForm.Field {...props}>
          <input placeholder="Course Title" />
        </SemanticForm.Field>
      </SemanticForm.Group>
      </SemanticForm>
    );
  };

  courseLanguage = props => {
    return (
      <SemanticForm>
      <SemanticForm.Group>
        <SemanticForm.Field {...props}>
          <input placeholder="Language" />
        </SemanticForm.Field>
      </SemanticForm.Group>
      </SemanticForm>
    );
  };

  render() {
    return (
      <Form model="forms.course" onSubmit={course => this.handleSubmit(course)}>
        <Control
          model="forms.course.title"
          id="forms.course.title"
          component={this.courseTitle}
        />
        <Control
          model="forms.course.language"
          id="forms.course.language"
          component={this.courseLanguage}
        />
        <Button type="submit">Add Course</Button>
      </Form>
    );
  }
}

const mapStateToProps = state => {
  return {
    auth: state.auth,
    app: state.app,
    forms: state.forms
  };
};

export default connect(
  mapStateToProps,
  actions
)(CourseForm);
