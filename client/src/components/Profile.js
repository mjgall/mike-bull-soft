import React from 'react'
import { connect } from 'react-redux';
import * as actions from '../actions';

class Profile extends React.Component {

  render() {
    return (
      <ul>
        <li>
          {this.props.auth.first_name} {this.props.auth.last_name}
        </li>
        <li>
          {this.props.auth.email}
        </li>
        <li>
          {this.props.auth.photo_url}
        </li>
      </ul>
    )
  }
}

const mapStateToProps = state => {
  return {
    auth: state.auth,
    app: state.app
  };
};

export default connect(
  mapStateToProps,
  actions
)(Profile);