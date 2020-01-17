import React from 'react';

import * as actions from '../actions';
import { Router } from 'react-router-dom';
import history from '../history';
import { connect } from 'react-redux';
import Menu from './Menu';
import { Grid, Container, Responsive, Icon } from 'semantic-ui-react';
import './app.css';
import FullStory, { FullStoryAPI } from 'react-fullstory';

import Loader from './Loader';
import Routes from './Routes';

class ScrollToTop extends React.Component {
  componentDidUpdate(prevProps) {
    if (this.props.location.pathname !== prevProps.location.pathname) {
      window.scrollTo(0, 0);
    }
  }

  render() {
    return null;
  }
}

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // You can also log the error to an error reporting service
    console.error(error, errorInfo);
    this.setState({hasError: true})
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (
        <div className="warning">
          <h2>Something has gone wrong.</h2>
          <p>
            Please refresh the page. If you continue to see this please contact
            Support.
          </p>
          <a
            href="mailto:support@gllghr.io"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: '#fff', textDecoration: 'none' }}>
            <Icon name="mail"></Icon>support@{window.location.host}
          </a>
        </div>
      );
    }
    return this.props.children;
  }
}

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
      <ErrorBoundary>
        <Router history={history}>
          <ScrollToTop location={ history.location}/>
          <FullStory org="H1N0D"></FullStory>
          <Responsive minWidth={768}>
            {this.props.auth ? <Menu history={history} /> : null}
            <div className={this.props.auth ? 'base' : 'base-login'}>
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
            {this.props.auth ? (
              <Menu history={history} device="mobile" />
            ) : null}
            <Container
              className={this.props.auth ? 'mobile-base' : 'mobile-base-login'}>
              <Grid columns={16} stackable>
                {this.state.authLoaded ? (
                  <Routes
                    auth={this.props.auth}
                    {...this.props}
                    mobile={true}></Routes>
                ) : (
                  <Loader></Loader>
                )}
              </Grid>
            </Container>
          </Responsive>
        </Router>
      </ErrorBoundary>
    );
  }
}

const mapStateToProps = state => {
  return { auth: state.auth, app: state.app };
};

export default connect(mapStateToProps, actions)(App);
