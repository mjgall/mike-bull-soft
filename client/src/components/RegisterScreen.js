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

export default class LoginScreen extends React.Component {
  render() {
    return (
      <React.Fragment>
        <Menu />
        <Grid.Column width={5}></Grid.Column>
        <Grid.Column style={{ maxWidth: 450 }} width={6}>
          <Header as="h2" textAlign="center">
            Register
          </Header>
          <Form
            size="large"
            action={`${window.location.origin}/auth/register`}
            method="POST">
            <Segment>
              <Form.Input
                name="email"
                fluid
                icon="envelope"
                iconPosition="left"
                placeholder="E-mail address"
              />
              <Form.Input
                name="first_name"
                fluid
                icon="user"
                iconPosition="left"
                placeholder="First Name"
              />
              <Form.Input
                name="last_name"
                fluid
                icon="user"
                iconPosition="left"
                placeholder="Last Name"
              />
              <Form.Input
                name="password"
                fluid
                icon="lock"
                iconPosition="left"
                placeholder="Password"
                type="password"
              />
              <Button fluid size="large">
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
