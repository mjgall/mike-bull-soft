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
import Student from './Student/Student';
import Creator from './Creator/Creator';
import Dnd from './LessonsTableDnd';
import LoginScreen from './LoginScreen';
import RegisterScreen from './RegisterScreen';
import Profile from './Profile';
import Loader from './Loader';

const Routes = props => {
  if (props.auth) {
    return (
      <div className="app-base">
        <Switch>
          <Route path="/creator" component={Creator}></Route>
          <Route path="/student" component={Student}></Route>
          <Route path="/home" component={Student}></Route>
          <Route path="/profile" component={Profile}></Route>
          <Route path="/" exact component={Student}></Route>
        </Switch>
      </div>
    );
  } else {
    return (
      <Switch>
        <Route component={LoginScreen} path="/login" exact>
          <LoginScreen history={history} mobile={props.mobile}></LoginScreen>
        </Route>
        <Route component={RegisterScreen} path="/register" exact />
        <Route history={history} component={LoginScreen} path="/" exact>
          <LoginScreen history={history} mobile={props.mobile}></LoginScreen>
        </Route>
      </Switch>
    );
  }
};

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
          <Container className="base">
            <Grid columns={16} stackable>
              {this.state.authLoaded ? (
                <Routes {...this.props}></Routes>
              ) : (
                <Loader></Loader>
              )}
            </Grid>
          </Container>
        </Responsive>
        <Responsive maxWidth={768}>
          <Menu history={history} device="mobile" />
          <Container className="mobile-base">
            <Grid columns={16} stackable>
              {this.state.authLoaded ? (
                <Routes {...this.props} mobile={true}></Routes>
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
