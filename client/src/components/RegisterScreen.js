import React from 'react';
import {
  Grid,
  Header,
  Form,
  Segment,

  Button,
  Message,
  Icon
} from 'semantic-ui-react';

import { Link } from 'react-router-dom';
import axios from 'axios';
import * as actions from '../actions';
import { connect } from 'react-redux';

class RegisterScreen extends React.Component {
  state = {
    email: '',
    firstName: '',
    lastName: '',
    password: '',
    message: '',
    error: ''
  };

  handlePasswordChange = event => {
    this.setState({ password: event.target.value });
  };

  handleFirstNameChange = event => {
    this.setState({ firstName: event.target.value });
  };

  handleLastNameChange = event => {
    this.setState({ lastName: event.target.value });
  };

  handleEmailChange = event => {
    this.setState({ email: event.target.value });
  };

  submit = async () => {
    const { email, firstName, lastName, password } = this.state;
    if (email && firstName && lastName && password) {
      const response = await axios.post('/auth/register', {
        email: email,
        first_name: firstName,
        last_name: lastName,
        password: password
      });

      if (response.data.message === 'success') {
        this.setState({ message: 'User created' });
        setTimeout(() => this.props.history.push('/login'), 1000);
      } else {
        this.setState({ error: response.data.message });
      }
    } else {
      this.setState({ error: 'Please complete all fields.' });
    }
  };

  render() {
    return (
      <React.Fragment>
 
        <Grid.Column style={{ maxWidth: 450, margin: '0 auto' }} width={6}>
          <Header as="h2" textAlign="center">
            Register
          </Header>
          {this.state.message ? (
            <Message success>{this.state.message}</Message>
          ) : null}
          {this.state.error ? (
            <Message negative>{this.state.error}</Message>
          ) : null}
          <Form size="large">
            <Segment>
              <Form.Input
                ref={this.emailField}
                onChange={this.handleEmailChange}
                name="email"
                fluid
                icon="envelope"
                iconPosition="left"
                placeholder="E-mail address"
          
              />
              <Form.Input
                ref={this.firstNameField}
                onChange={this.handleFirstNameChange}
                name="first_name"
                fluid
                icon="user"
                iconPosition="left"
                placeholder="First Name"
            
              />
              <Form.Input
                ref={this.lastNameField}
                onChange={this.handleLastNameChange}
                name="last_name"
                fluid
                icon="user"
                iconPosition="left"
                placeholder="Last Name"
           
              />
              <Form.Input
                ref={this.passwordField}
                onChange={this.handlePasswordChange}
                name="password"
                fluid
                icon="lock"
                iconPosition="left"
                placeholder="Password"
                type="password"
                
              />
              <Button fluid size="large" onClick={this.submit}>
                Register
              </Button>
            </Segment>
          </Form>
          <Message>
            Have an existing account? <Link to="/login">Log In</Link>
          </Message>
          <Message>
            <Icon name="google"></Icon>
            <a href="/auth/google">Log in with Google</a>
          </Message>
        </Grid.Column>

      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return { auth: state.auth, app: state.app };
};

export default connect(
  mapStateToProps,
  actions
)(RegisterScreen);
