import React from 'react';
import { Table } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../actions';

class CoursesTable extends React.Component {
  renderStudentTable = () => {
    return (
      <Table celled singleLine sortable>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>ID</Table.HeaderCell>
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
                    <Table.Cell>{course.id}</Table.Cell>
                    <Table.Cell>
                      <Link to={`/course/${course.id}`}>
                        {course.title}
                      </Link>
                    </Table.Cell>
                    <Table.Cell>{course.owner_id}</Table.Cell>
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
            <Table.HeaderCell>ID</Table.HeaderCell>
            <Table.HeaderCell>Course</Table.HeaderCell>
            <Table.HeaderCell>Owner</Table.HeaderCell>
            <Table.HeaderCell>Create Date</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {this.props.app && this.props.app.coursesTable
            ? this.props.app.coursesTable.map((course, index) => {
                return (
                  <Table.Row key={index}>
                    <Table.Cell>{course.course_id}</Table.Cell>
                    <Table.Cell>
                      <Link to={`/course/${course.course_id}`}>
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
            : null}
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
