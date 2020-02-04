import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';
import * as utils from '../utils';

import { Button, Modal, Message, Form, Segment } from 'semantic-ui-react';

import Roadmap from './Roadmap';

class Profile extends React.Component {
  state = {
    logins: [],
    editingPassword: false,
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  };

  componentDidMount = async () => {
    const logins = await utils.getLogins(this.props.auth.id);
    this.setState({ logins: logins.response });
  };

  changePassword = () => {
    this.setState({ editingPassword: !this.state.editingPassword });
  };

  submitPasswordChange = async () => {
    if (this.state.confirmPassword === this.state.newPassword) {
      const response = await utils.submitNewPassword(
        null,
        this.state.newPassword,
        this.props.auth.id,
        this.state.currentPassword
      );
      if (response.success) {
        this.setState({ success: true, message: 'Password reset' });
      } else {
        this.setState({ success: false, message: response.message });
      }
    } else {
      this.setState({ message: 'Passwords do not match' });
    }
  };

  handleCurrentPasswordChange = event => {
    this.setState({ currentPassword: event.target.value });
  };

  handleNewPasswordChange = event => {
    this.setState({ newPassword: event.target.value });
  };

  handleConfirmPasswordChange = event => {
    this.setState({ confirmPassword: event.target.value });
  };

  deleteAccount = () => {
    this.props.history.push('/api/logout');
    utils.deleteUserAccount(this.props.auth.id);
  };

  render() {
    return (
      <div>
        <div style={{}}>
          <h2>
            {this.props.auth.first_name} {this.props.auth.last_name}
          </h2>

          <div>
            <p>
              { this.props.auth.email }
              <br></br>
              <em>User since { (new Date(this.props.auth.create_date)).toLocaleDateString() }</em>
            </p>
          </div>

          <Modal
            trigger={<Button>All logins</Button>}
            header="Logins"
            actions={[{ key: 'done', content: 'Done', positive: true }]}>
            <Modal.Content scrolling>
              <ul>
                {this.state.logins.map((login, index) => {
                  return (
                    <li key={index}>
                      {new Date(login.timestamp * 1000).toLocaleString()}
                    </li>
                  );
                })}
              </ul>
            </Modal.Content>
          </Modal>
          <Modal
            trigger={<Button>Roadmap</Button>}
            actions={[{ key: 'done', content: 'Done', positive: true }]}>
            <Modal.Header>To Do</Modal.Header>
            <Modal.Content scrolling>
              <div style={{ padding: '15px' }}>
                <Roadmap></Roadmap>
              </div>
            </Modal.Content>
          </Modal>

          {this.props.auth.service_id ? null : (
            <Button onClick={this.changePassword}>Change Password</Button>
          )}
        </div>
        {this.state.editingPassword ? (
          <Segment style={{ maxWidth: '382px' }}>
            <Form>
              {this.state.message ? (
                <Message
                  negative={this.state.success ? false : true}
                  positive={this.state.success ? true : false}>
                  {this.state.message}
                </Message>
              ) : null}
              <Form.Input
                type="password"
                value={this.state.currentPassword}
                onChange={this.handleCurrentPasswordChange}
                placeholder="Current password"></Form.Input>
              <Form.Input
                type="password"
                value={this.state.newPassword}
                onChange={this.handleNewPasswordChange}
                placeholder="New password"></Form.Input>
              <Form.Input
                type="password"
                value={this.state.confirmPassword}
                onChange={this.handleConfirmPasswordChange}
                placeholder="Confirm new password"></Form.Input>
              <Button onClick={this.submitPasswordChange}>Submit</Button>
            </Form>
          </Segment>
        ) : null}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    auth: state.auth,
    app: state.app
  };
};

export default connect(mapStateToProps, actions)(Profile);
