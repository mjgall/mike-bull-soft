import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';
import * as utils from '../utils';
import axios from 'axios';

import { Button, List } from 'semantic-ui-react';
import Loader from './Loader';

class Roadmap extends React.Component {
  state = { tasks: [], isLoaded: false };

  componentDidMount = async () => {
    const response = await axios.get(
      'https://cors-anywhere.herokuapp.com/https://api.clickup.com/api/v2/list/4468011/task?archived=false',
      {
        headers: {
          Authorization: 'pk_1396952_O7MIIPVUVX61LR5RI673TM2OMSCQ3WPB'
        }
      }
    );
    const tasks = response.data.tasks;
    this.setState({ tasks, isLoaded: true });
  };
  render() {
    return this.state.isLoaded ? (
      <List>
        {this.state.tasks.map((task, index) => {
          return (
            <List.Item key={index} style={{ margin: '1rem 0' }}>
              <List.Content>
                <List.Header>{task.name}</List.Header>
                <List.Description>{task.text_content}</List.Description>
              </List.Content>
            </List.Item>
          );
        })}
      </List>
    ) : (
      <Loader></Loader>
    );
  }
}

const mapStateToProps = state => {
  return {
    auth: state.auth,
    app: state.app
  };
};

export default connect(mapStateToProps, actions)(Roadmap);
