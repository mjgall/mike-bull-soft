import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';
import * as utils from '../utils';

import { Button } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

class Profile extends React.Component {
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
            <h4>{ this.props.auth.email }</h4>
            <h5>Last login: {new Date(this.props.auth.last_login * 1000).toLocaleString()}</h5>
          </div>
          {/* <Button>Change password</Button>
          <Button onClick={this.deleteAccount}>Delete account</Button> */}

          <Link to="/roadmap">View roadmap</Link>
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
