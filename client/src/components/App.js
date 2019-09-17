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
import './app.css'
import Drawing from './Drawing';

class App extends React.Component {
  componentDidMount() {
    this.props.fetchUser();
    this.props.fetchCourses();
    this.props.fetchAllCourses();
  }


  protectRoutes = () => {
    if (this.props.auth) {
      switch (this.props.app.creatorMode) {
        case true:
          return (
            //CREATOR MODE ROUTES
            <Switch>
              <Route component={Home} path="/" exact />
              <Route component={Home} path="/home" exact />
              <Route component={Course} path="/course/:course" exact />
              <Route component={Symbol} path="/symbol/:symbol" exact />
              <Route component={Drawing} path="/drawing" exact/>
            </Switch>
          );
        case false:
          return (
            //STUDENT MODE (DEFAULT) ROUTES
            <Switch>
              <Route component={Home} path="/" exact />
              <Route component={Home} path="/home" exact />
              <Route component={Course} path="/course/:course" exact />
              <Route component={Symbol} path="/symbol/:symbol" exact />
              <Route component={Drawing} path="/drawing" exact/>
            </Switch>
          );
        default:
          break;
      }
    } else {
      return (
        <Switch>
          <Route component={Drawing} path="/drawing" exact/>
          <Route component={Home} path="/*" exact />
        </Switch>
      );
    }
  };

  render() {
    return (
      <Router history={history}>
        <Menu history={history}/>
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
