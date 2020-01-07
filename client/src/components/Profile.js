import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';
import * as utils from '../utils';

import { Button } from 'semantic-ui-react';

class Profile extends React.Component {

  changePassword = () => {
    console.log('change password')
  }

  deleteAccount = () => {
    utils.deleteUserAccount(this.props.auth.id)
    this.props.history.push('/api/logout')
  }

  render() {
    return (
      <div>
        {this.props.auth.first_name} {this.props.auth.last_name}
        {this.props.auth.email}
        {this.props.auth.photo_url}
        <Button onClick={this.changePassword}>Change password</Button>
        <Button onClick={this.deleteAccount}>Delete account</Button>
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
