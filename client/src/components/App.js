import React from 'react';
import Home from './Home';
import Course from './NotNeeded/Course';
import Symbol from './Student/StudentSymbol';
import * as actions from '../actions';
import { Router, Route, Switch } from 'react-router-dom';
import history from '../history';
import { connect } from 'react-redux';
import Menu from './Menu';
import { Grid, Container } from 'semantic-ui-react';
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

  routes = () => {
    if (this.props.auth) {
      return (
        <Switch>
          <Route path="/creator" component={Creator}></Route>
          <Route path="/student" component={Student}></Route>
          <Route path="/home" component={Student}></Route>
          <Route path="/profile" component={Profile}></Route>
          <Route path="/login" component={LoginScreen} exact />
          <Route path="/register" component={RegisterScreen} exact />
          <Route path="/" exact component={Student}></Route>
        </Switch>
      );
    } else {
      return (
        <Switch>
          <Route component={Student} path="/home"></Route>
          <Route component={Drawing} path="/drawing" exact />
          <Route component={Dnd} path="/dnd" exact />
          <Route component={LoginScreen} path="/login" exact />
          <Route component={RegisterScreen} path="/register" exact />
          <Route history={history} component={LoginScreen} path="/" exact />
        </Switch>
      );
    }
  };

  render() {
    return (
      <Router history={history}>
        <FullStory org="H1N0D"></FullStory>
        <Menu history={history} />
        <Container>
          <Grid container columns={16} style={{ paddingTop: '75px' }} stackable>
            {this.state.authLoaded ? this.routes() : <Loader></Loader>}
          </Grid>
        </Container>
      </Router>
    );
  }
}

const mapStateToProps = state => {
  return { auth: state.auth, app: state.app };
};

export default connect(
  mapStateToProps,
  actions
)(App);
