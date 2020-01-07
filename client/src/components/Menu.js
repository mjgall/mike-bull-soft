import React from 'react';
import { Menu as SemanticMenu, Container } from 'semantic-ui-react';
import { connect } from 'react-redux';
import * as actions from '../actions';
import { Link } from 'react-router-dom';
import ProfileCard from './ProfileCard';

class Menu extends React.Component {
  switchMode = () => {
    this.props.switchMode();
    if (this.props.app.creatorMode) {
      this.props.history.push('/student');
    } else {
      this.props.history.push('/creator');
    }
  };

  renderMobileMenu = () => {
    if (this.props.auth) {
      switch (this.props.app.creatorMode) {
        case true:
          return (
            <React.Fragment>
              <SemanticMenu.Item header>
                <Link to="/home">LLT</Link>
              </SemanticMenu.Item>
              <SemanticMenu.Menu position="right">
                <SemanticMenu.Item
                  onClick={this.switchMode}
                  style={{ cursor: 'pointer' }}>
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
                <SemanticMenu.Item
                  onClick={this.switchMode}
                  style={{ cursor: 'pointer' }}>
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
              <Link to="/login">Log In</Link>
            </SemanticMenu.Item>
          </SemanticMenu.Menu>
        </React.Fragment>
      );
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
              <SemanticMenu.Item>
                <ProfileCard></ProfileCard>
              </SemanticMenu.Item>
              <SemanticMenu.Menu position="right">
                <SemanticMenu.Item
                  onClick={this.switchMode}
                  style={{ cursor: 'pointer' }}>
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
              <SemanticMenu.Item>
                <ProfileCard></ProfileCard>
              </SemanticMenu.Item>
              <SemanticMenu.Menu position="right">
                <SemanticMenu.Item
                  onClick={this.switchMode}
                  style={{ cursor: 'pointer' }}>
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
              <Link to="/login">Log In</Link>
            </SemanticMenu.Item>
          </SemanticMenu.Menu>
        </React.Fragment>
      );
    }
  };

  render() {
    if (this.props.device === 'mobile') {
      return (
        <SemanticMenu
        fixed="top"
        style={{ boxShadow: '0 6px 6px 2px #ccc' }}>
        {this.renderMobileMenu()}

      </SemanticMenu>
      )
    } else {
      return (
        <SemanticMenu
          // inverted
          vertical
          fixed={'left'}
          style={{ boxShadow: '0 6px 6px 2px #ccc' }}>
  
          {this.renderMenu()}
  
        </SemanticMenu>
      );
    }
    
  }
}

const mapStateToProps = state => {
  return {
    auth: state.auth,
    app: state.app
  };
};

export default connect(mapStateToProps, actions)(Menu);
