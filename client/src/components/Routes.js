import { Route, Switch } from 'react-router-dom';
import React from 'react';

import history from '../history';

import Student from './Student/Student';
import Creator from './Creator/Creator';

import LoginScreen from './LoginScreen';
import RegisterScreen from './RegisterScreen';
import Profile from './Profile';
import Roadmap from './Roadmap';
import ForgotPassword from './ForgotPassword';
import ResetPassword from './ResetPassword';

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
          <Route path="/roadmap" exact component={Roadmap}></Route>
          <Route
          path="/reset/:token"
          children={({ match }) => (
            <ResetPassword
              history={history}
              mobile={props.mobile}
              match={match}></ResetPassword>
          )}></Route>
          <Route
            path="/test"
            exact
            component={() => {
              return (
                <div>
                  <h1>Hello</h1>
                  <p>This is the beginning of a new blog post.</p>
                </div>
              );
            }}></Route>
        </Switch>
      </div>
    );
  } else {
    return (
      //NOT LOGGED IN ROUTES
      <Switch>
        <Route path="/login" exact>
          <LoginScreen
            auth={props.auth}
            history={history}
            mobile={props.mobile}></LoginScreen>
        </Route>
        <Route path="/register" exact>
          <RegisterScreen
            history={history}
            mobile={props.mobile}></RegisterScreen>
        </Route>
        <Route path="/" exact>
          <LoginScreen
            auth={props.auth}
            history={history}
            mobile={props.mobile}></LoginScreen>
        </Route>
        <Route path="/roadmap" exact component={Roadmap}></Route>
        <Route path="/forgot" exact>
          <ForgotPassword
            history={history}
            mobile={props.mobile}></ForgotPassword>
        </Route>
        <Route
          path="/reset/:token"
          children={({ match }) => (
            <ResetPassword
              history={history}
              mobile={props.mobile}
              match={match}></ResetPassword>
          )}></Route>
      </Switch>
    );
  }
};

export default Routes;
