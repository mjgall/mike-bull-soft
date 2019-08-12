import React from 'react';
import { Component } from 'react';
import Menu from './Menu';

export default class Login extends Component {
  render() {
    return (
      <div>
        <Menu />
        <div>
          <h1>
            Log in to continue
          </h1>
        </div>
      </div>
    );
  }
}
