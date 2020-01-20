import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import * as utils from '../../utils';
import Loader from '../Loader';
import { Grid, Segment, Icon, Button } from 'semantic-ui-react';

import { Link } from 'react-router-dom';

import LessonsTable from '../LessonsTable';
import SymbolsTable from '../SymbolsTable';

class StudentCourse extends React.Component {
  state = { isLoaded: false, courseStarted: false, exists: false };

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

    if (course.exists) {
      //symbols
    const symbols = await utils.fetchSymbols(this.props.match.params.id);
    //order of the lessons

    const lessonOrder = course.lessons_order.split(',').map(id => parseInt(id));
    //lessons
    const lessons = this.sortLessons(
      await utils.fetchLessons(this.props.match.params.id),
      lessonOrder
    );

    if (
      this.props.app.startedCourses
        .map(course => {
          return course.course_id;
        })
        .indexOf(parseInt(this.props.match.params.id)) >= 0
    ) {
      this.setState({ courseStarted: true });
    }

    this.setState({ course });
    this.setState({ symbols });
    this.setState({ lessons });
    this.setState({ isLoaded: true, hasError: false });
    } else {
      this.setState({ isLoaded: true, hasError: true });
    }
    
  }

  startCourse = () => {
    utils.startCourse(this.props.auth.id, parseInt(this.props.match.params.id));
    this.setState({courseStarted: true})
  };

  continueCourse = () => {

  };

  renderCourse = () => {
    if (this.state.course && this.state.isLoaded && !this.state.hasError) {
      return (
        <div>
          <div>
            <h4>
              <Link to="/student">Back to courses</Link>
            </h4>
          </div>
          <Segment attached>
            <div className="student-course-title-bar">
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
          <Segment attached="bottom">
            <Grid>
              <Grid.Row columns={1}>
                <Grid.Column>
                  {this.state.courseStarted ? (
                    <Button
                      animated="fade"
                      style={{ background: 'lightgreen', width: '100%' }}
                      onClick={this.continueCourse}>
                      <Button.Content visible>Continue Course</Button.Content>
                      <Button.Content hidden>
                        <Icon name="arrow right" />
                      </Button.Content>
                    </Button>
                  ) : (
                    <Button
                      style={{ background: 'lightgreen', width: '100%' }}
                      onClick={this.startCourse}>
                      Begin course
                    </Button>
                  )}
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Segment>
          <h2>Lessons</h2>
          <LessonsTable
            location={this.props.match.url}
            lessons={this.state.lessons}
            course={this.state.course}></LessonsTable>
          <h2>Symbols</h2>
          <SymbolsTable
            symbols={this.state.symbols}
            renderLocation={this.props.match.url}
          />
        </div>
      );
    } else {
      return (
        <div className="warning">
          <h2>
            You do not have permission to access this record or this record does
            not exist.
          </h2>
          <p>If you believe this is a mistake please contact Support.</p>
          <a
            href={`mailto:support@${window.location.host}`}
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: '#fff', textDecoration: 'none' }}>
            <Icon name="mail"></Icon>support@{window.location.host}
          </a>
        </div>
      )
    }
    
  };

  render() {
    return (
      <React.Fragment>
        <Grid.Column width={16}>
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

export default connect(mapStateToProps, actions)(StudentCourse);
