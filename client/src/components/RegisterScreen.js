import React from 'react';
import {
  Grid,
  Header,
  Form,
  Segment,
  Image,
  Button,
  Message,
  Icon
} from 'semantic-ui-react';
import Menu from './Menu';
import { Link } from 'react-router-dom';
import axios from 'axios';
import * as actions from '../actions';
import { connect } from 'react-redux';

class RegisterScreen extends React.Component {
  state = {
    email: '',
    firstName: '',
    lastName: '',
    password: ''
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
    const response = await axios.post('/auth/register', {
      email: this.state.email,
      first_name: this.state.firstName,
      last_name: this.state.lastName,
      password: this.state.password
    });

    if (response.data.message === 'success') {
      this.props.history.push('/login');
    } else {
      this.setState({ error: response.data.message });
    }
  };

  render() {
    return (
      <React.Fragment>
        <Menu />
        <Grid.Column width={5}></Grid.Column>
        <Grid.Column style={{ maxWidth: 450 }} width={6}>
          <Header as="h2" textAlign="center">
            Register
          </Header>
          <Form size="large">
            <Segment>
              <Form.Input
                onChange={this.handleEmailChange}
                name="email"
                fluid
                icon="envelope"
                iconPosition="left"
                placeholder="E-mail address"
              />
              <Form.Input
                onChange={this.handleFirstNameChange}
                name="first_name"
                fluid
                icon="user"
                iconPosition="left"
                placeholder="First Name"
              />
              <Form.Input
                onChange={this.handleLastNameChange}
                name="last_name"
                fluid
                icon="user"
                iconPosition="left"
                placeholder="Last Name"
              />
              <Form.Input
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
        <Grid.Column width={5}></Grid.Column>
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
