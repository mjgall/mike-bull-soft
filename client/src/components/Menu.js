import React from 'react';
import { Menu as SemanticMenu, Container } from 'semantic-ui-react';
import { connect } from 'react-redux';
import * as actions from '../actions';
import { Link, Redirect } from 'react-router-dom';

class Menu extends React.Component {

  switchMode = () => {
    this.props.switchMode();
    this.props.history.push('/');
  };

  renderMenu = () => {
    if (this.props.auth) {
      switch (this.props.app.creatorMode) {
        case true:
          return (
            <React.Fragment>
              <SemanticMenu.Item header>
                <Link to="/home">LLT</Link>
              </SemanticMenu.Item>
              <SemanticMenu.Menu position="right">
                <SemanticMenu.Item>
                  <div onClick={this.switchMode} style={{cursor:'pointer'}}>Go to Student Mode</div>
                </SemanticMenu.Item>
                <SemanticMenu.Item>
                  <a href="/api/logout">Log Out</a>
                </SemanticMenu.Item>
              </SemanticMenu.Menu>
            </React.Fragment>
          );

        default:
          return (
            <React.Fragment>
              <SemanticMenu.Item header>
                <Link to="/home">LLT</Link>
              </SemanticMenu.Item>
              <SemanticMenu.Menu position="right">
                <SemanticMenu.Item>
                  <div onClick={this.switchMode} style={{cursor:'pointer'}}>Go to Creator Mode</div>
                </SemanticMenu.Item>
                <SemanticMenu.Item>
                  <a href="/api/logout">Log Out</a>
                </SemanticMenu.Item>
              </SemanticMenu.Menu>
            </React.Fragment>
          );
      }
    } else {
      return (
        <React.Fragment>
          <SemanticMenu.Item header>
            <Link to="/home">LLT</Link>
          </SemanticMenu.Item>
          <SemanticMenu.Menu position="right">
            <SemanticMenu.Item>
              <a href="/auth/google">Log In</a>
            </SemanticMenu.Item>
          </SemanticMenu.Menu>
        </React.Fragment>
      );
    }
  };

  render() {
    return (
      <SemanticMenu
        inverted
        fixed={'top'}
        style={{ boxShadow: '0 6px 6px 2px #ccc' }}>
        <Container>{this.renderMenu()}</Container>
      </SemanticMenu>
    );
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
)(Menu);
