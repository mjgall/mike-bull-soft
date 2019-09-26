import React from 'react';

import { connect } from 'react-redux';

import { Link } from 'react-router-dom';

import * as actions from '../../actions';

import { Grid } from 'semantic-ui-react';

import SymbolsTable from '../SymbolsTable';
import ProfileCard from '../ProfileCard';
import AddSymbolModal from '../AddSymbolModal';
import Loader from '../Loader';

import * as utils from '../../utils';
import EditCourseModal from './EditCourseModal';

class CreatorCourse extends React.Component {
  state = {
    course: {},
    symbols: [],
    isLoaded: false,
    showModal: false,
    isFetching: false
  };

  async componentWillMount() {
    const course = await utils.fetchCourse(
      this.props.match.params.id,
      this.props.auth.id
    );
    const symbols = await utils.fetchSymbols(this.props.match.params.id);
    this.setState({ course });
    this.setState({ symbols });
    this.setState({ isLoaded: true });
  }

  rerenderAfterSubmit = async () => {
    this.setState({ isFetching: true });
    const symbols = await utils.fetchSymbols(this.props.match.params.id);
    this.setState({ symbols });
    this.setState({ isFetching: false });
  };

  renderCourse = () => {
    if (this.state.course.owner) {
      return (
        <div>
          <h4>
            <Link to="/creator">Back to courses</Link>
          </h4>
          <div>
            <ul>
              <li id="title">{this.state.course.title}</li>
              <li id="owner">
                {`${this.state.course.first_name} ${this.state.course.last_name}`}
              </li>
              <li id="id">{this.state.course.course_id}</li>
              <li id="create-date">
                {new Date(
                  this.state.course.create_date * 1000
                ).toLocaleString()}
              </li>
            </ul>
            <div>{this.state.course.description}</div>
          </div>
          <h2>Symbols</h2>
          {this.props.app.creatorMode ? (
            <AddSymbolModal
              courseId={this.state.course.course_id}
              courseLanguage={this.state.course.language}
              toggleShowModalCallback={this.rerenderAfterSubmit}
              modalOpen={this.state.showModal}></AddSymbolModal>
          ) : null}
          <EditCourseModal
            title={this.state.course.title}
            description={this.state.course.description}
            difficulty={this.state.course.difficulty}
            language={this.state.course.language}>
          </EditCourseModal>
          <SymbolsTable
            symbols={this.state.symbols}
            renderLocation={this.props.match.url}
          />
        </div>
      );
    } else {
      return <h2 className="warning">You are not the owner of this course.</h2>;
    }
  };

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
)(CreatorCourse);
