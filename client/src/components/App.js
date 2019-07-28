import React from 'react';
import { Component } from 'react';
import { Menu } from 'semantic-ui-react';

import axios from 'axios';

export default class App extends Component {
  testButton = () => {
    axios.post('/api/testdb', {
      googleId: '3456789',
      first_name: 'Gichael',
      last_name: 'Mallagher',
      email: 'mike.gallagh@gmail.com',
      photo_url: 'catsone.com/image.jpg'
    });
  };

  render() {
    return (
      <div>
        <Menu fixed="top" inverted>
          <Menu.Item as="a" header>
            MikeBullSoft
          </Menu.Item>
          <Menu.Menu position="right">
            <Menu.Item as="a">
              <a href="/auth/google">Log In</a>
            </Menu.Item>
          </Menu.Menu>
        </Menu>
      </div>
    );
  }
}
