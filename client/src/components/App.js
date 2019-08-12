import React from 'react';
import Login from './Login';
import Home from './Home';
import Course from './Course';
import Symbol from './Symbol';
import * as actions from '../actions';
import { Router, Route, Switch } from 'react-router-dom';
import history from '../history';
import { connect } from 'react-redux';
import Menu from './Menu';
import { Grid, Container } from 'semantic-ui-react';

class App extends React.Component {
  componentDidMount() {
    this.props.fetchUser();
    this.props.fetchCourses();
  }

  protectRoutes = () => {
    console.log(this.props.auth)
    if (this.props.auth) {
      return (
        <Switch>
          <Route component={Home} path="/" exact />
          <Route component={Home} path="/home" exact />
          <Route component={Course} path="/course/:course" exact />
          <Route component={Symbol} path="/symbol/:symbol" exact />
        </Switch>
      );
    } else {
      return (
        <Switch>
          <Route component={Login} path="/" exact />
        </Switch>
      );
    }
  };

  componentWillMount() {}

  render() {
    return (
      <Router history={history}>
        <Menu />
        <Container>
          <Grid container columns={16} style={{ paddingTop: '75px' }} stackable>
            {this.protectRoutes()}
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
