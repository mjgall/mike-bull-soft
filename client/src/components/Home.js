import React from 'react';
import Menu from './Menu';
import CoursesTable from './CoursesTable';
import { connect } from 'react-redux';
import * as actions from '../actions';

class Home extends React.Component {
  componentWillMount() {
    this.props.fetchUser();
  }

  render() {
    return (
      <div>
        <Menu loggedIn user={this.props.auth} />
        <CoursesTable />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { auth: state.auth };
};

export default connect(
  mapStateToProps,
  actions
)(Home);
