import React from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { Table, Ref, Icon } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import ConfirmDelete from './ConfirmDelete';
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

  getItemStyle = (isDragging, draggableStyle) => ({
    background: isDragging && 'lightblue',
    display: isDragging && 'table',
    borderRadius: '5px',
    ...draggableStyle
  });

  deleteLesson = async (id, index, userId) => {
    await utils.deleteLesson(id);
    const lessons = [...this.state.lessons];
    lessons.splice(index, 1);
    this.setState({ lessons });
  };

  render() {
    return (
      <DragDropContext
        onDragEnd={this.onDragEnd}
        onDragStart={this.onDragStart}>
        <Table celled singleLine compact>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Title</Table.HeaderCell>
              <Table.HeaderCell>Categories</Table.HeaderCell>
              <Table.HeaderCell># Symbols</Table.HeaderCell>
              <Table.HeaderCell>Create Date</Table.HeaderCell>
              {this.props.mode === 'creator' ? (
                <>
                  <Table.HeaderCell>Delete</Table.HeaderCell>
                  <Table.HeaderCell>
                    <Icon
                      name="hand pointer outline"
                      style={{ color: 'gray' }}></Icon>
                  </Table.HeaderCell>
                </>
              ) : (
                <Table.HeaderCell>Begin</Table.HeaderCell>
              )}
            </Table.Row>
          </Table.Header>
          <Droppable droppableId="table">
            {(provided, snapshot) => (
              <Ref innerRef={provided.innerRef}>
                <Table.Body {...provided.droppableProps} id="table-body">
                  {this.state.lessons &&
                    this.state.lessons.map((lesson, index) => (
                      <Draggable
                        isDragDisabled={
                          this.props.mode === 'creator' ? false : true
                        }
                        draggableId={lesson.id}
                        index={index}
                        key={lesson.id}>
                        {(provided, snapshot) => {
                          return (
                            <Ref innerRef={provided.innerRef}>
                              <Table.Row
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                style={this.getItemStyle(
                                  snapshot.isDragging,
                                  provided.draggableProps.style
                                )}>
                                <Table.Cell style={{ width: '30%' }}>
                                  {lesson.title}
                                </Table.Cell>
                                <Table.Cell style={{ width: '15%' }}>
                                  {lesson.categories ? lesson.categories : ''}
                                </Table.Cell>
                                <Table.Cell style={{ width: '15%' }}>
                                  {lesson.symbols ? lesson.symbols.length : ''}
                                </Table.Cell>
                                <Table.Cell style={{ width: '30%' }}>
                                  {new Date(
                                    lesson.create_date * 1000
                                  ).toLocaleString()}
                                </Table.Cell>
                                {this.props.mode === 'creator' ? (
                                  // <ConfirmDelete
                                  //   trigger={
                                  //     <Table.Cell
                                  //       style={{ width: '10%' }}
                                  //       onClick={() =>
                                  //         this.deleteLesson(lesson.id, index)
                                  //       }>
                                  //       <Icon
                                  //         name="delete"
                                  //         style={{ color: 'red' }}></Icon>
                                  //     </Table.Cell>
                                  //   }></ConfirmDelete>
                                  <>
                                    <ConfirmDelete
                                      deleteFunction={this.deleteLesson}
                                      recordId={lesson.id}
                                      index={index}
                                      recordType="lesson"
                                      on="click"
                                      position="top center"
                                      trigger={
                                        <Table.Cell style={{ width: '10%' }}>
                                          <Icon
                                            name="delete"
                                            style={{ color: 'red' }}></Icon>
                                        </Table.Cell>
                                      }></ConfirmDelete>
                                    <Table.Cell>
                                      <Icon
                                        name="bars"
                                        style={{ color: 'gray' }}></Icon>
                                    </Table.Cell>
                                  </>
                                ) : (
                                  <Table.Cell style={{ width: '10%' }}>
                                    <Link
                                      to={`${this.props.location}/lesson/${lesson.id}`}>
                                      Begin
                                    </Link>
                                  </Table.Cell>
                                )}
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
