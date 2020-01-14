import React from 'react';
import Home from './Home';
import Course from './NotNeeded/Course';
import Symbol from './Student/StudentSymbol';
import * as actions from '../actions';
import { Router, Route, Switch } from 'react-router-dom';
import history from '../history';
import { connect } from 'react-redux';
import Menu from './Menu';
import { Grid, Container, Responsive } from 'semantic-ui-react';
import './app.css';
import Drawing from './Drawing';
import FullStory, { FullStoryAPI } from 'react-fullstory';

import Loader from './Loader';
import Routes from './Routes';

class App extends React.Component {
  state = {
    authLoaded: false
  };

  componentDidMount = async () => {
    await this.props.fetchUser();
    this.setState({ authLoaded: true });

    if (this.props.auth) {
      FullStoryAPI('identify', this.props.auth.id, {
        displayName:
          this.props.auth.first_name + ' ' + this.props.auth.last_name,
        email: this.props.auth.email
      });
    }
  };

  render() {
    return (
      <Router history={history}>
        <FullStory org="H1N0D"></FullStory>
        <Responsive minWidth={768}>
          {this.props.auth ? <Menu history={history} /> : null}
          <div className={this.props.auth ? "base" : "base-login"}>
            <Grid columns={16} stackable>
              {this.state.authLoaded ? (
                <Routes auth={this.props.auth} {...this.props}></Routes>
              ) : (
                <Loader></Loader>
              )}
            </Grid>
          </div>
        </Responsive>
        <Responsive maxWidth={768}>
          <Menu history={history} device="mobile" />
          <Container className={this.props.auth ? "mobile-base" : "mobile-base-login"}>
            <Grid columns={16} stackable>
              {this.state.authLoaded ? (
                <Routes auth={this.props.auth} {...this.props} mobile={true}></Routes>
              ) : (
                <Loader></Loader>
              )}
            </Grid>
          </Container>
        </Responsive>
      </Router>
    );
  }
}

const mapStateToProps = state => {
  return { auth: state.auth, app: state.app };
};

export default connect(mapStateToProps, actions)(App);
