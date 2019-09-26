import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import * as utils from '../../utils';
import Loader from '../Loader';
import {Grid} from 'semantic-ui-react';
import ProfileCard from '../ProfileCard';

class StudentCourse extends React.Component {

  state = {isLoaded: false}

  async componentWillMount() {

    const course = await utils.fetchCourse(this.props.match.params.id, this.props.auth.id)
    this.setState({course})
    this.setState({isLoaded: true})
  }

  renderCourse =() => {
    return (
      <ul>
        <li>{this.state.course.title}</li>
        <li>{this.state.course.first_name + ' ' + this.state.course.last_name}</li>
        <li>{this.state.course.language}</li>
        <li>{this.state.course.difficulty}</li>
        <li>{this.state.course.description}</li>
      </ul>
    )
  }
  
  render() {

    return (
      <React.Fragment>
        <Grid.Column width={4}>
          <ProfileCard />
        </Grid.Column>
        <Grid.Column width={12}>
          {this.state.isLoaded ? this.renderCourse() : <Loader></Loader>}
        </Grid.Column>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    auth: state.auth,
    app: state.app,
    form: state.forms.symbol
  };
};

export default connect(
  mapStateToProps,
  actions
)(StudentCourse);
