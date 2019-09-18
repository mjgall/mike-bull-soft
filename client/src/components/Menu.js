import React from 'react';
import { Menu as SemanticMenu, Container } from 'semantic-ui-react';
import { connect } from 'react-redux';
import * as actions from '../actions';
import { Link } from 'react-router-dom';

class Menu extends React.Component {

  switchMode = () => {
    this.props.switchMode();
    if (this.props.app.creatorMode) {
      this.props.history.push('/student')
    } else {
      this.props.history.push('/creator')
    }
    
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
                <SemanticMenu.Item onClick={this.switchMode} style={{cursor:'pointer'}}>
                  <div>Go to Student Mode</div>
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
              <SemanticMenu.Item onClick={this.switchMode} style={{cursor:'pointer'}}>
                  <div>Go to Creator Mode</div>
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
