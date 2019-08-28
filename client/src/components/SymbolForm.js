import React from 'react';
import { Control } from 'react-redux-form';
import Form from './Form';
import { Button, Form as SemanticForm } from 'semantic-ui-react';
import { connect } from 'react-redux';
import * as actions from '../actions';

class SymbolForm extends React.Component {
  addSymbol = symbol => {
    this.props.addSymbol({
      owner_id: this.props.auth.id,
      course_id: this.props.app.course.course_id,
      text: symbol.text
    });
  };

  handleSubmit(symbol) {
    this.addSymbol(symbol);
  }

  symbolText = props => {
    return (
      <SemanticForm.Group>
        <SemanticForm.Field {...props}>
          <input placeholder="Symbol Text" />
        </SemanticForm.Field>
      </SemanticForm.Group>
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
