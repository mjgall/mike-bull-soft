import React from 'react';
import Entry from './Entry';
import Home from './Home';
import Course from './Course';
import * as actions from '../actions';
import { Router, Route, Switch } from 'react-router-dom';
import history from '../history';
import { connect } from 'react-redux';
import Menu from './Menu';
import { Grid, Container } from 'semantic-ui-react';


class App extends React.Component {
  render() {
    return (
      <Router history={history}>
        <Menu />
        <Container>
          <Grid container columns={16} style={{ paddingTop: '75px' }}>
            <Switch>
              <Route component={Entry} path="/" exact />
              <Route component={Home} path="/home" exact />
              <Route component={Course} path="/course/:course" exact />
            </Switch>
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
