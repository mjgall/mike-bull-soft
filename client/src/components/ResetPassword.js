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

export default class ResetPassword extends React.Component {

  state = {
    email: '',
    error: ''
  };

  handleEmailChange = event => {
    this.setState({ email: event.target.value });
  };

  submit = async () => {
    console.log(this.state.email)
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
  };
}
