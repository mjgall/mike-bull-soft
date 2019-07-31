import React from 'react';
import { Table, Container } from 'semantic-ui-react';
import { connect } from 'react-redux';
import * as actions from '../actions';

class CoursesTable extends React.Component {
  state = {
    courses: [
      { name: 'Course 1', owner: 'Mike Gallagher', createDate: '05/10/1992' },
      { name: 'Course 2', owner: 'Matt Gallagher', createDate: '05/17/1988' },
      { name: 'Course 3', owner: 'Tom Gallagher', createDate: '08/02/1957' },
      { name: 'Course 3', owner: 'Shari Gallagher', createDate: '08/25/1957' }
    ]
  };

  componentWillMount() {
    this.props.fetchCourses();
  }

  render() {
    return (
      <Container>
        <Table celled fixed singleLine>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Course</Table.HeaderCell>
              <Table.HeaderCell>Owner</Table.HeaderCell>
              <Table.HeaderCell>Create Date</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            { this.props.app &&this.props.app.courses
              ? this.props.app.courses.map((course, index) => {
                  return (
                    <Table.Row key={index}>
                      <Table.Cell>{course.title}</Table.Cell>
                      <Table.Cell>{course.first_name} {course.last_name}</Table.Cell>
                      <Table.Cell>{course.create_date}</Table.Cell>
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
