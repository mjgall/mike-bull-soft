import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';

class StudentCourse extends React.Component {
  async componentWillMount() {
    await this.props.getCourse(this.props.match.params.id);
  }

  render() {
    return <div>Student Course</div>
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
