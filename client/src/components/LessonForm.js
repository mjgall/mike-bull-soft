import {
  Control,
  Form,
  Errors,
  modelReducer,
  actions as rrfActions
} from 'react-redux-form';
import { Dropdown } from 'semantic-ui-react';
import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';

class LessonForm extends React.Component {

  state = {
    selectedSymbols: []
  };

  handleSelect = (event, data) => {
    this.props.resetForm('forms.lesson', { symbols: data.value, title: this.props.forms.lesson.title });
    this.setState({ selectedSymbols: data.value });
  };

  render() {
    return (
      <Form
        validateOn="submit"
        model="forms.lesson"
        // onSubmit={course => this.addCourse(course)}
        className="ui form">
        <div className="two fields">
          <div className="field">
            <Control.text
              defaultValue={this.props.editing ? this.props.title : ''}
              model="forms.lesson.title"
              placeholder="Title"
              validators={{ required: value => value && value.length }}
              validateOn="change"
            />
            <Errors
              className="error"
              model="forms.lesson.title"
              show={{ touched: true, focus: false }}
              messages={{
                required: 'Required'
              }}
            />
          </div>
          <div className="field">
            <Dropdown
              placeholder="Symbols"
              fluid
              multiple
              selection
              onChange={this.handleSelect}
              options={ this.props.symbols.map(symbol => {
                return {
                  key: symbol.text,
                  text: symbol.text,
                  value: symbol.id
                };
              })}
            />

            {/* <Control.select
              disabled={this.props.editing}
              validators={{ required: value => value && value.length }}
              defaultValue={
                this.props.editing ? this.props.language : 'english'
              }
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
            /> */}
          </div>
          {/* <div className="field">
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
          </div> */}
        </div>

        {/* <div className="field">
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
        </div> */}
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
)(LessonForm);
