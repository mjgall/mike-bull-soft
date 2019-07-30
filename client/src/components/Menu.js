import React from 'react';
import { Menu as SemanticMenu, Container } from 'semantic-ui-react';
import { connect } from 'react-redux';
import * as actions from '../actions';

class Menu extends React.Component {
  getCourses = () => {
    this.props.fetchCourses(this.props.auth.google_id);
  };

  renderLog = () => {
    if (this.props.loggedIn && this.props.user) {
      return (
        <React.Fragment>
          <SemanticMenu.Item>
            <a href="/api/logout">Log Out</a>
          </SemanticMenu.Item>
        </React.Fragment>
      );
    } else {
      return (
        <React.Fragment>
          <SemanticMenu.Item>
            <a href="/auth/google">Log In</a>
          </SemanticMenu.Item>
        </React.Fragment>
      );
    }
  };

  render() {
    return (
      <SemanticMenu fixed="top" inverted>
        <Container>
          <SemanticMenu.Item as="a" header>
            MikeBullSoft
          </SemanticMenu.Item>
          <SemanticMenu.Menu position="right">
            {this.renderLog()}
          </SemanticMenu.Menu>
        </Container>
      </SemanticMenu>
    );
  }
}

const mapStateToProps = state => {
  return {
    auth: state.auth
  };
};

export default connect(
  mapStateToProps,
  actions
)(Menu);
