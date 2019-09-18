import React from 'react';
import Home from './Home';
import Course from './Course';
import Symbol from './Symbol';
import * as actions from '../actions';
import { Router, Route, Switch } from 'react-router-dom';
import history from '../history';
import { connect } from 'react-redux';
import Menu from './Menu';
import { Grid, Container } from 'semantic-ui-react';
import './app.css';
import Drawing from './Drawing';
import FullStory, { FullStoryAPI } from 'react-fullstory';
import Student from './Student';
import Creator from './Creator'

class App extends React.Component {
  async componentDidMount() {
    await this.props.fetchUser();
    FullStoryAPI('identify', this.props.auth.id, {
      displayName: this.props.auth.first_name + ' ' + this.props.auth.last_name,
      email: this.props.auth.email
    });
    this.props.fetchCourses();
    this.props.fetchAllCourses();
  }

  protectRoutes = () => {
    if (this.props.auth) {
      return (
        <Switch>
          <Route
            // component={Home}
            render={() => <Home history={history}></Home>}
            path="/home"
            exact
          />
          <Route component={Creator} path='/creator' ></Route>
          <Route component={Student} path='/student' ></Route>
          <Route component={Course} path="/course/:course" exact />
          <Route component={Symbol} path="/symbol/:symbol" exact />
          <Route component={Drawing} path="/drawing" exact />
          <Route component={Home} path="/*" exact />
        </Switch>
      );
    } else {
      return (
        <Switch>
          <Route component={Drawing} path="/drawing" exact />
          <Route component={Home} path="/*" exact />
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
