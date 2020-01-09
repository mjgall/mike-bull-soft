import {Route, Switch } from 'react-router-dom';
import React from 'react'

import history from '../history';

import Student from './Student/Student';
import Creator from './Creator/Creator';

import LoginScreen from './LoginScreen';
import RegisterScreen from './RegisterScreen';
import Profile from './Profile';
import Roadmap from './Roadmap'


const Routes = props => {
  if (props.auth) {
    return (
      <div className="app-base">
        <Switch>
          <Route path="/creator" component={Creator}></Route>
          <Route path="/student" component={Student}></Route>
          <Route path="/home" component={Student}></Route>
          <Route path="/profile" component={Profile}></Route>
          <Route path="/" exact component={ Student }></Route>
          <Route path="/roadmap" exact component = {Roadmap}></Route>
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
        <Route path="/roadmap" exact component = {Roadmap}></Route>
      </Switch>
    );
  }
};

export default Routes;