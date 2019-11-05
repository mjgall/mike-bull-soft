import React from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { Table, Ref, Icon } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import * as utils from '../utils';

const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  return result;
};

export default class LessonsTableDnD extends React.Component {
  state = {
    lessons: this.props.lessons
  };

  componentDidUpdate(prevProps) {
    if (this.props.lessons !== prevProps.lessons) {
      this.setState({ lessons: this.props.lessons });
    }
  }

  onDragEnd = async result => {
    if (!result.destination) {
      return;
    }

    const lessons = reorder(
      this.state.lessons,
      result.source.index,
      result.destination.index
    );

    this.setState({
      lessons
    });

    const lessonOrder = lessons.map(lesson => lesson.id).toString();
    utils.editCourse({
      title: this.props.course.title,
      language: this.props.course.language,
      description: this.props.course.description,
      difficulty: this.props.course.difficulty,
      owner_id: this.props.course.owner_id,
      id: this.props.course.id,
      lessonsOrder: lessonOrder
    });
  };

  getStyles = (isDragging, providedStyles) => {
    return { ...providedStyles };
  };

  deleteLesson = async (id, index, userId) => {
    const response = await utils.deleteLesson(id);
    console.log(response)
  };

  render() {
    return (
      <DragDropContext onDragEnd={this.onDragEnd}>
        <Table>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Title</Table.HeaderCell>
              <Table.HeaderCell>Categories</Table.HeaderCell>
              <Table.HeaderCell># Symbols</Table.HeaderCell>
              <Table.HeaderCell>Create Date</Table.HeaderCell>
              <Table.HeaderCell>Delete</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Droppable droppableId="table">
            {(provided, snapshot) => (
              <Ref innerRef={provided.innerRef}>
                <Table.Body {...provided.droppableProps}>
                  {this.state.lessons &&
                    this.state.lessons.map((lesson, index) => (
                      <Draggable
                        draggableId={lesson.id}
                        index={index}
                        key={lesson.id}>
                        {(provided, snapshot) => {
                          return (
                            <Ref innerRef={provided.innerRef}>
                              <Table.Row
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}>
                                <Table.Cell>
                                  <Link
                                    to={`${this.props.location}/lesson/${lesson.id}`}>
                                    {lesson.title}
                                  </Link>
                                </Table.Cell>
                                <Table.Cell>
                                  {lesson.categories ? lesson.categories : ''}
                                </Table.Cell>
                                <Table.Cell>
                                  {lesson.symbols ? lesson.symbols.length : ''}
                                </Table.Cell>
                                <Table.Cell>
                                  {new Date(
                                    lesson.create_date * 1000
                                  ).toLocaleString()}
                                </Table.Cell>
                                <Table.Cell
                                  onClick={() =>
                                    this.deleteLesson(lesson.id, index)
                                  }>
                                  <Icon
                                    name="delete"
                                    style={{ color: 'red' }}></Icon>
                                </Table.Cell>
                              </Table.Row>
                            </Ref>
                          );
                        }}
                      </Draggable>
                    ))}
                  {provided.placeholder}
                </Table.Body>
              </Ref>
            )}
          </Droppable>
        </Table>
      </DragDropContext>
    );
  }
}
