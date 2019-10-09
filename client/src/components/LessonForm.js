import {
  Control,
  Form,
  Errors
} from 'react-redux-form';
import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';

class CourseForm extends React.Component {
  addCourse = course => {

    this.props.addCourse({
      title: course.title,
      language: course.language,
      description: course.description,
      difficulty: course.difficulty,
      owner_id: this.props.auth.google_id
    });
  };

  render() {
    return (
      <Form
        validateOn="submit"
        model="forms.course"
        onSubmit={course => this.addCourse(course)}
        className="ui form">
        <div className="three fields">
          <div className="field">
            <Control.text
              defaultValue={this.props.editing ? this.props.title : ''}
              model="forms.course.title"
              placeholder="Title"
              validators={{ required: value => value && value.length }}
              validateOn="change"
            />
            <Errors
              className="error"
              model="forms.course.title"
              show={{touched: true, focus: false}}
              messages={{
                required: 'Required'
              }}
            />
          </div>
          <div className="field">
            <Control.select
              disabled={this.props.editing}
              validators={{ required: value => value && value.length }}
              defaultValue={this.props.editing ? this.props.language : 'english'}
              model="forms.course.language"
              className="ui selection dropdown"
              placeholder="Language">
              <option value="english">English</option>
              <option value="spanish">Spanish</option>
              <option value="german">German</option>
            </Control.select>
            <Errors
              className="error"
              model="forms.course.language"
              show={false}
              messages={{
                required: 'Required'
              }}
            />
          </div>
          <div className="field">
            <Control.select
              validators={{ required: value => value && value.length }}
              defaultValue={this.props.editing ? this.props.difficulty : 'novice'}
              model="forms.course.difficulty"
              className="ui selection dropdown"
              placeholder="Difficulty">
              <option value="novice">Novice</option>
              <option value="intermediate">Intermediate</option>
              <option value="advanced">Advanced</option>
            </Control.select>
            <Errors
              className="error"
              model="forms.course.difficulty"
              show={false}
              messages={{
                required: 'Required'
              }}
            />
          </div>
        </div>

        <div className="field">
          <Control.textarea
            validators={{ required: value => value && value.length }}
            defaultValue={this.props.editing ? this.props.description : ''}
            validateOn="change"
            model="forms.course.description"
            placeholder="Description"
          />
          <Errors
            className="error"
            model="forms.course.description"
            show="touched"
            messages={{
              required: 'Required'
            }}
          />
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
