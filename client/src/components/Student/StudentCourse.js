import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import * as utils from '../../utils';
import Loader from '../Loader';
import { Grid, Segment } from 'semantic-ui-react';
import ProfileCard from '../ProfileCard';
import { Link } from 'react-router-dom';

import LessonsTable from '../LessonsTable';
import SymbolsTable from '../SymbolsTable';

class StudentCourse extends React.Component {
  state = { isLoaded: false };

  sortLessons = (lessons, lessonOrder) => {
    return lessons.sort(function(a, b) {
      //Calculate index value of a
      var A = lessonOrder.indexOf(a.id);
      if (A === -1) {
        A = lessonOrder.length;
      }
      //Calculate index value of b
      var B = lessonOrder.indexOf(b.id);
      if (B === -1) {
        B = lessonOrder.length;
      }
      //Return comparison
      return A - B;
    });
  };

  async componentDidMount() {
    //course
    const course = await utils.fetchCourse(
      this.props.match.params.id,
      this.props.auth.id
    );
    //symbols
    const symbols = await utils.fetchSymbols(this.props.match.params.id);
    //order of the lessons
    const lessonOrder = course.lessons_order.split(',').map(id => parseInt(id));
    //lessons
    const lessons = this.sortLessons(
      await utils.fetchLessons(this.props.match.params.id),
      lessonOrder
    );

    this.setState({ course });
    this.setState({ symbols });
    this.setState({ lessons });
    this.setState({ isLoaded: true });


  }

  renderCourse = () => {
    return (
      <div>
        <div>
          <h4>
            <Link to="/creator">Back to courses</Link>
          </h4>
        </div>
        <Segment>
          <div className="student=course-title-bar">
            <h2>{this.state.course.title}</h2>
          </div>
          <div className="student-course-details">
            <p>{`${this.state.course.first_name} ${this.state.course.last_name}`}</p>
            <p>
              {new Date(
                this.state.course.create_date * 1000
              ).toLocaleDateString()}
            </p>
          </div>
          <div className="student-course-description">
            <p>{this.state.course.description}</p>
          </div>
        </Segment>
        <h2>Lessons</h2>
        <LessonsTable
          location={this.props.match.url}
          lessons={this.state.lessons}
          course={ this.state.course }></LessonsTable>
        <h2>
          Symbols
        </h2>
        <SymbolsTable symbols={this.state.symbols} renderLocation={this.props.match.url}/>
      </div>
    );
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
)(StudentCourse);
