import React from 'react';
import { Table, Loader, Icon, Confirm, Button } from 'semantic-ui-react';
import { connect } from 'react-redux';
import * as actions from '../actions';
import history from '../history';

class CoursesTable extends React.Component {
  state = { confirmOpen: true };

  componentWillMount() {
    this.props.fetchCourses();
    this.props.fetchAllCourses();
  }

  handleNav = id => {
    history.push(`student/course/${id}`);
  };
  handleCreatorNav = id => {
    history.push(`/creator/course/${id}`);
  };

  deleteCourse = (id, index, userId) => {
    this.props.deleteCourse(id, index, userId);
  };

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
                  <Table.Row
                    key={index}
                    onClick={() => this.handleNav(course.id)}>
                    <Table.Cell>{course.title}</Table.Cell>
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
            <Table.HeaderCell>Delete</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {this.props.app && this.props.app.coursesTable ? (
            this.props.app.coursesTable.map((course, index) => {
              return (
                <Table.Row key={index}>
                  <Table.Cell
                    onClick={() => this.handleCreatorNav(course.course_id)}>
                    {course.title}
                  </Table.Cell>
                  <Table.Cell
                    onClick={() => this.handleCreatorNav(course.course_id)}>
                    {course.first_name} {course.last_name}
                  </Table.Cell>
                  <Table.Cell
                    onClick={() => this.handleCreatorNav(course.course_id)}>
                    {new Date(course.create_date * 1000).toLocaleString()}
                  </Table.Cell>
                  <Table.Cell
                    onClick={() => this.deleteCourse(course.course_id, index)}>
                    <Icon name="delete" style={{ color: 'red' }}></Icon>
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
