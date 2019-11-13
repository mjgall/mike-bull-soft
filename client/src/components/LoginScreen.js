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
import {Link} from 'react-router-dom'

export default class LoginScreen extends React.Component {
  render() {
    return (
      <React.Fragment>
        <Menu />
        <Grid.Column width={5}></Grid.Column>
        <Grid.Column style={{ maxWidth: 450 }} width={6}>
          <Header as="h2" textAlign="center">
            Log In
          </Header>
          <Form
            size="large"
            action={`${window.location.origin}/auth/login`}
            method="POST">
            <Segment stacked>
              <Form.Input
                name="email"
                fluid
                icon="user"
                iconPosition="left"
                placeholder="E-mail address"
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
                Login
              </Button>
            </Segment>
          </Form>
          
          <Message>
            New? <Link to="/register">Sign Up</Link>
          </Message>
          <Message>
          <Icon name="google"></Icon><a href="/auth/google">Log in with Google</a>
          </Message>
        </Grid.Column>
        <Grid.Column width={5}></Grid.Column>
      </React.Fragment>
    );
  }
}
