import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';
import * as utils from '../utils';

import { Button, Modal } from 'semantic-ui-react';

import Roadmap from './Roadmap';

class Profile extends React.Component {
  state = { logins: [] };

  componentDidMount = async () => {
    const logins = await utils.getLogins(this.props.auth.id);
    this.setState({ logins: logins.response });
    console.log(this.state);
  };

  changePassword = () => {
    console.log('change password');
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
            <h4>{this.props.auth.email}</h4>
          </div>
          {/* <Button>Change password</Button>
          <Button onClick={this.deleteAccount}>Delete account</Button> */}
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
            header="To Do"
            // content={}
            actions={[{ key: 'done', content: 'Done', positive: true }]}>
            <Modal.Content scrolling>
              <div style={{ padding: '15px' }}>
                <Roadmap></Roadmap>
              </div>
            </Modal.Content>
          </Modal>
        </div>
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
