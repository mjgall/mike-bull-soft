import React from 'react';
import { Form as ReduxForm } from 'react-redux-form';

function Form(props) {
  return <ReduxForm {...props} className="ui form" />;
}

export default Form;
