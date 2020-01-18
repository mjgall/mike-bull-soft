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

class LoginScreen extends React.Component {
  state = {
    email: '',
    password: '',
    error: ''
  };

  handlePasswordChange = event => {
    this.setState({ password: event.target.value });
  };

  handleEmailChange = event => {
    this.setState({ email: event.target.value });
  };

  submit = async () => {
    const response = await axios.post('/auth/login', {
      email: this.state.email,
      password: this.state.password
    });

    if (response.data.message === 'redirect') {
      await this.props.fetchUser();
      this.props.history.push('/home');
    } else {
      this.setState({ error: response.data.message });
    }
  };

  render() {
    if (this.props.mobile) {
      return (
        <React.Fragment>
          <Grid.Column width={16}>
            <Header as="h2" textAlign="center">
              Log In
            </Header>
            <h4 className="error">
              {this.state.error ? (
                <Message negative>{this.state.error}</Message>
              ) : null}
            </h4>
            <Form size="large">
              <Segment>
                <Form.Input
                  name="email"
                  fluid
                  icon="user"
                  iconPosition="left"
                  placeholder="E-mail address"
                  onChange={this.handleEmailChange}
                  value={this.state.email}
                />
                <Form.Input
                  name="password"
                  fluid
                  icon="lock"
                  iconPosition="left"
                  placeholder="Password"
                  type="password"
                  onChange={this.handlePasswordChange}
                  value={this.state.password}
                />

                <Button fluid size="large" onClick={this.submit}>
                  Login
                </Button>
              </Segment>
            </Form>
            <Message>
              New? <Link to="/register">Sign Up</Link>
            </Message>
            <Message>
              <Link to="/forgot">Forgot your password?</Link>
            </Message>
            <Message className="google">
              <Icon name="google"></Icon>
              <a href="/auth/google">Log in with Google</a>
            </Message>
          </Grid.Column>
        </React.Fragment>
      );
    } else {
      return (
        <React.Fragment>
          <Grid.Column width={5}></Grid.Column>
          <Grid.Column style={{ maxWidth: 450, margin: '0 auto' }} width={6}>
            <Header as="h2" textAlign="center">
              Log In
            </Header>
            <h4 className="error">
              {this.state.error ? (
                <Message negative>{this.state.error}</Message>
              ) : null}
            </h4>
            <Form size="large">
              <Segment>
                <Form.Input
                  name="email"
                  fluid
                  icon="user"
                  iconPosition="left"
                  placeholder="E-mail address"
                  onChange={this.handleEmailChange}
                  value={this.state.email}
                />
                <Form.Input
                  name="password"
                  fluid
                  icon="lock"
                  iconPosition="left"
                  placeholder="Password"
                  type="password"
                  onChange={this.handlePasswordChange}
                  value={this.state.password}
                />

                <Button fluid size="large" onClick={this.submit}>
                  Login
                </Button>
              </Segment>
            </Form>
            <Message>
              New? <Link to="/register">Sign Up</Link>
            </Message>
            <Message>
              <Link to="/forgot">Forgot your password?</Link>
            </Message>
            <Message className="google">
              <Icon name="google"></Icon>
              <a href="/auth/google">Log in with Google</a>
            </Message>
          </Grid.Column>
          <Grid.Column width={5}></Grid.Column>
        </React.Fragment>
      );
    }
  }
}

const mapStateToProps = state => {
  return { auth: state.auth, app: state.app };
};

export default connect(mapStateToProps, actions)(LoginScreen);
