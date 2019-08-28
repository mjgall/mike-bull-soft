import { Control, Form } from 'react-redux-form';
import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';

class CourseForm extends React.Component {
  addCourse = course => {
    console.log(course);
    this.props.addCourse({
      title: course.title,
      // language: course.language,
      owner_id: this.props.auth.google_id
    });
  };

  handleSubmit(course) {
    this.addCourse(course);
  }

  render() {
    return (
      <Form
        model="forms.course"
        onSubmit={course => this.handleSubmit(course)}
        className="ui form">
        <div className="fields">
          <div className="field">
            <Control.text model="forms.course.title" placeholder="Title" />
          </div>
          <div className="field">
            <Control.select
              model="forms.course.language"
              className="ui selection dropdown"
              placeholder="Language">
              <option value="english">English</option>
              <option value="spanish">Spanish</option>
              <option value="german">German</option>
            </Control.select>
          </div>

          <button type="submit" className="ui button">
            Submit
          </button>
        </div>
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
