import React from 'react';
import { Card, Icon} from 'semantic-ui-react';
import {Link} from 'react-router-dom'
import { connect } from 'react-redux';
import * as actions from '../actions';

class ProfileCard extends React.Component {
  render() {
    return (
      <Card style={{ width: '100%' }}>
        <Card.Content>
          <Card.Header>
            {this.props.auth
              ? `${this.props.auth.first_name} ${this.props.auth.last_name}`
              : null}
          </Card.Header>
   
          <Link to="/profile">View Profile</Link>
        
        </Card.Content>
        <Card.Content extra>
          <Icon name="book" />
          {this.props.app ? this.props.app.coursesTable.length : null} Courses
        </Card.Content>
        
      </Card>
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
)(ProfileCard);
