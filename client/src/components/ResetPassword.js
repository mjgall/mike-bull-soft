import React from 'react';
import {
  Grid,
  Header,
  Form,
  Segment,
  Button,
  Message
} from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import * as utils from '../utils';

export default class ResetPassword extends React.Component {
  state = {
    password: '',
    confirmPassword: '',
    info: false,
    error: false,
    token: '',
    message: '',
    userId: null
  };

  handlePasswordChange = event => {
    this.setState({ password: event.target.value });
  };

  handleConfirmPasswordChange = event => {
    this.setState({ confirmPassword: event.target.value });
  };

  submit = async () => {
    if (this.state.password === this.state.confirmPassword) {
      const response = await utils.submitNewPassword(
        this.state.token,
        this.state.password,
        this.state.userId
      );
      if (response.error) {
        this.setState({ info: true, error: true, message: response.message });
      } else {
        this.setState({ info: true, error: false, message: response.message });
        setTimeout(() => this.props.history.push('/login'), 1500);
      }
    } else {
      this.setState({
        message: 'Passwords do not match',
        info: true,
        error: true
      });
    }
  };

  componentDidMount = async () => {
    const { token } = this.props.match.params;
    this.setState({ token });
    const response = await utils.checkToken(token);
    console.log(response);
    if (response.success) {
      this.setState({ valid: true, userId: response.user.id });
    } else
      this.setState({
        valid: false,
        info: true,
        error: true,
        message: response.message
      });
  };

  render = () => {
    return (
      <React.Fragment>
        <Grid.Column width={5}></Grid.Column>
        <Grid.Column style={{ maxWidth: 450, margin: '0 auto' }} width={6}>
          <Header as="h2" textAlign="center">
            Reset Password
          </Header>
          <h4 className="error">
            {this.state.info ? (
              <Message negative={this.state.error ? true : false}>
                {this.state.message}
              </Message>
            ) : null}
          </h4>
          {this.state.valid ? (
            <Form size="large">
              <Segment>
                <Form.Input
                  name="password"
                  fluid
                  icon="lock"
                  iconPosition="left"
                  type="password"
                  placeholder="New password"
                  onChange={this.handlePasswordChange}
                  value={this.state.password}
                />
                <Form.Input
                  name="password"
                  fluid
                  icon="lock"
                  iconPosition="left"
                  type="password"
                  placeholder="Confirm new password"
                  onChange={this.handleConfirmPasswordChange}
                  value={this.state.confirmPassword}
                />
                <Button fluid size="large" onClick={this.submit}>
                  Submit
                </Button>
              </Segment>
            </Form>
          ) : null}

          <Message>
            <Link to="/login">Log in</Link>
          </Message>
        </Grid.Column>
        <Grid.Column width={5}></Grid.Column>
      </React.Fragment>
    );
  };
}
