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
import * as utils from '../utils'

export default class ForgotPassword extends React.Component {

  state = {
    email: '',
    error: false,
    message: '',
    info: false
  };

  handleEmailChange = event => {
    this.setState({ email: event.target.value });
  };

  submit = async () => {
    const response = await utils.resetPassword(this.state.email, window.location.origin);
    this.setState({info: true, error: response.error, message: response.message})
  };

  render = () => {
    if (this.props.mobile) {
      return (
        <React.Fragment>

          <Grid.Column width={16}>
            <Header as="h2" textAlign="center">
              Reset Password
            </Header>
            <h4 className="error">
              {this.state.info ? (
                <Message positive={this.state.error ? false : true} negative={this.state.error ? true : false}>{this.state.message}</Message>
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
  
                <Button fluid size="large" onClick={this.submit}>
                  Submit
                </Button>
              </Segment>
            </Form>
            <Message>
              New? <Link to="/register">Sign Up</Link>
            </Message>
            <Message>
              <Link to="/login">Log in</Link>
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
              Reset Password
            </Header>
            <h4 className="error">
              {this.state.info ? (
                <Message positive={this.state.error ? false : true} negative={this.state.error ? true : false}>{this.state.message}</Message>
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
  
                <Button fluid size="large" onClick={this.submit}>
                  Submit
                </Button>
              </Segment>
            </Form>
            <Message>
              New? <Link to="/register">Sign Up</Link>
            </Message>
            <Message>
              <Link to="/login">Log in</Link>
            </Message>
          </Grid.Column>
          <Grid.Column width={5}></Grid.Column>
        </React.Fragment>
      );
    }
    
  };
}
