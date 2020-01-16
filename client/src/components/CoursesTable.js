import React from 'react';
import { Table, Loader, Icon  } from 'semantic-ui-react';
import { connect } from 'react-redux';
import * as actions from '../actions';
import history from '../history';
import ConfirmDelete from './ConfirmDelete';

class CoursesTable extends React.Component {
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


  renderStudentTable = () => {
    return (
      <Table celled singleLine sortable compact>
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

  deleteCourse = async (courseId, index, userId) => {
    return await this.props.deleteCourse(courseId, index, userId)
  }

  renderCreatorTable = () => {
    return (
      <Table celled singleLine sortable compact basic>
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

                  <ConfirmDelete
                    trigger={
                      <Table.Cell>
                        <Icon name="delete" style={ { color: 'red' } }></Icon>
                      </Table.Cell> }
                    on="click"
                    position="top center"
                    recordId={course.course_id}
                    index={ index }
                    recordType='course'
                    deleteFunction = {this.deleteCourse}
                  />
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

export default connect(mapStateToProps, actions)(CoursesTable);
