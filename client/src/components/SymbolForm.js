import React from 'react';
import { Control, Errors } from 'react-redux-form';
import Form from './Form';
import { connect } from 'react-redux';
import * as actions from '../actions';

class SymbolForm extends React.Component {
  addSymbol = symbol => {
    this.props.addSymbol({
      owner_id: this.props.auth.id,
      course_id: this.props.app.course.course_id,
      text: symbol.text,
      language: this.props.app.course.language
    });
  };

  handleSubmit(symbol) {
    this.addSymbol(symbol);
  }

  render() {
    return (
      <Form
        model="forms.symbol"
        onSubmit={symbol => this.handleSubmit(symbol)}
        className="ui form"
        validateOn="submit">
        <div className="fields">
          <div className="field">
            <Control.text
              model="forms.symbol.text"
              placeholder="Text"
              validators={{ required: value => value && value.length }}
              validateOn="change"
            />
            <Errors
              className="error"
              model="forms.course.title"
              show={{ touched: true, focus: false }}
              messages={{
                required: 'Required'
              }}
            />
          </div>
          <button type="submit" className="ui button positive">
            Add Symbol
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
)(SymbolForm);
