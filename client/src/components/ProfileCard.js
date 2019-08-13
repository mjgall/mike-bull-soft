import React from 'react';
import { Card, Icon, Image } from 'semantic-ui-react';
import { connect } from 'react-redux';
import * as actions from '../actions';

class ProfileCard extends React.Component {
  render() {
    return (
      <Card>
        <Image src={this.props.auth ? this.props.auth.photo_url : null} /> 
        <Card.Content>
          <Card.Header>
            {this.props.auth
              ? `${this.props.auth.first_name} ${this.props.auth.last_name}`
              : null}
          </Card.Header>
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
