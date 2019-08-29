import {
  Control,
  Form,
  Errors,
  actions as formActions,
  modelReducer
} from 'react-redux-form';
import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';

class CourseForm extends React.Component {
  addCourse = course => {
    console.log(course);
    this.props.addCourse({
      title: course.title,
      language: course.language,
      description: course.description,
      difficulty: course.difficulty,
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
        <div className="three fields">
          <div className="field">
            <Control.text
              model="forms.course.title"
              placeholder="Title"
              validators={{ required: value => value && value.length }}
            />
            <Errors
              className="error"
              model="forms.course.title"
              show="touched"
              messages={{
                required: 'Required'
              }}
            />
          </div>
          <div className="field">
            <Control.select
              validators={{ required: value => value && value.length }}
              model="forms.course.language"
              className="ui selection dropdown"
              placeholder="Language">
              <option value="english">English</option>
              <option value="spanish">Spanish</option>
              <option value="german">German</option>
            </Control.select>
            <Errors
              className="error"
              model="forms.course.title"
              show="touched"
              messages={{
                required: 'Required'
              }}
            />
          </div>
          <div className="field">
            <Control.select
              validators={{ required: value => value && value.length }}
              model="forms.course.difficulty"
              className="ui selection dropdown"
              placeholder="Difficulty">
              <option value="novice">Novice</option>
              <option value="intermediate">Intermediate</option>
              <option value="advanced">Advanced</option>
            </Control.select>
            <Errors
              className="error"
              model="forms.course.title"
              show="touched"
              messages={{
                required: 'Required'
              }}
            />
          </div>
        </div>

        <div className="field">
          <Control.textarea
            validators={{ required: value => value && value.length }}
            model="forms.course.description"
            placeholder="Description"
          />
          <Errors
            className="error"
            model="forms.course.title"
            show="touched"
            messages={{
              required: 'Required'
            }}
          />
        </div>

        <button type="submit" className="ui button positive">
          Create Course
        </button>
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
