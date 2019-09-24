import React from 'react';
import { Table, Loader } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../actions';

class CoursesTable extends React.Component {
  componentWillMount() {
    this.props.fetchCourses();
    this.props.fetchAllCourses();
  }

  renderStudentTable = () => {
    return (
      <Table celled singleLine sortable>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Course</Table.HeaderCell>
            <Table.HeaderCell>Owner</Table.HeaderCell>
            <Table.HeaderCell>Create Date</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {this.props.app && this.props.app.coursesTableStudent
            ? this.props.app.coursesTableStudent.map((course, index) => {
                return (
                  <Table.Row key={index}>
                    <Table.Cell>
                      <Link to={`${this.props.renderLocation}/course/${course.id}`}>{course.title}</Link>
                    </Table.Cell>
                    <Table.Cell>
                      {course.first_name} {course.last_name}
                    </Table.Cell>
                    <Table.Cell>
                      {new Date(course.create_date * 1000).toLocaleString()}
                    </Table.Cell>
                  </Table.Row>
                );
              })
            : null}
        </Table.Body>
      </Table>
    );
  };

  renderCreatorTable = () => {
    return (
      <Table celled singleLine sortable>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Course</Table.HeaderCell>
            <Table.HeaderCell>Owner</Table.HeaderCell>
            <Table.HeaderCell>Create Date</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {this.props.app && this.props.app.coursesTable ? (
            this.props.app.coursesTable.map((course, index) => {
              return (
                <Table.Row key={index}>
                  <Table.Cell>
                    <Link to={`${this.props.renderLocation}/course/${course.course_id}`}>
                      {course.title}
                    </Link>
                  </Table.Cell>
                  <Table.Cell>
                    {course.first_name} {course.last_name}
                  </Table.Cell>
                  <Table.Cell>
                    {new Date(course.create_date * 1000).toLocaleString()}
                  </Table.Cell>
                </Table.Row>
              );
            })
          ) : (
            <Loader active />
          )}
        </Table.Body>
      </Table>
    );
  };

  render() {
    console.log(this.props)
    if (this.props.app.creatorMode) {
      return this.renderCreatorTable();
    } else {
      return this.renderStudentTable();
    }
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
)(CoursesTable);
