import React from 'react';
import { Table, Container } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../actions';

class CoursesTable extends React.Component {

  componentWillMount() {
    this.props.fetchCourses();
  }

  render() {
    return (
      <Container>
        <Table celled singleLine sortable>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Course</Table.HeaderCell>
              <Table.HeaderCell>Owner</Table.HeaderCell>
              <Table.HeaderCell>Create Date</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {this.props.app && this.props.app.courses
              ? this.props.app.courses.map((course, index) => {
                  return (
                    <Table.Row key={index}>
                      <Table.Cell>
                        <Link to={`/course/${course.course_id}`}>
                          {course.title}
                        </Link>
                      </Table.Cell>
                      <Table.Cell>
                        {course.first_name} {course.last_name}
                      </Table.Cell>
                      <Table.Cell>{new Date(course.create_date*1000).toLocaleString()}</Table.Cell>
                    </Table.Row>
                  );
                })
              : null}
          </Table.Body>
        </Table>
      </Container>
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
)(CoursesTable);
