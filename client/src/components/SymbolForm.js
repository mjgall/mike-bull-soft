import React from 'react';
import { Control, Form } from 'react-redux-form';
import { Button, Form as SemanticForm } from 'semantic-ui-react';
import { connect } from 'react-redux';
import * as actions from '../actions';

class SymbolForm extends React.Component {
  addSymbol = symbol => {
    this.props.addSymbol({
      owner_id: this.props.auth.id,
      course_id: this.props.app.course.course_id,
      text: symbol.text,
      language: symbol.language
    });
  };

  handleSubmit(symbol) {
    this.addSymbol(symbol);
  }

  symbolText = props => {
    return (
      <SemanticForm>
        <SemanticForm.Field {...props}>
          <input placeholder="Symbol Text" />
        </SemanticForm.Field>
      </SemanticForm>
    );
  };

  symbolLanguage = props => {
    return (
      <SemanticForm>
        <SemanticForm.Field {...props}>
          <input placeholder="Language" />
        </SemanticForm.Field>
      </SemanticForm>
    );
  };

  render() {
    return (

      <Form model="forms.symbol" onSubmit={symbol => this.handleSubmit(symbol)}>
        <Control
          model="forms.symbol.text"
          id="forms.symbol.text"
          component={this.symbolText}
        />
        <Control
          model="forms.symbol.language"
          id="forms.symbol.language"
          component={this.symbolLanguage}
        />
        <Button type="submit">Add Symbol</Button>
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
