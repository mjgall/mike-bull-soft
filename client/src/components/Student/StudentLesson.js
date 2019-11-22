import React from 'react';
import { Pane, Text, Heading, Card, Icon } from 'evergreen-ui';
import * as utils from '../../utils';

export default class StudentLesson extends React.Component {
  state = {
    loaded: false,
    courseId: this.props.match.params.courseid,
    lessonId: this.props.match.params.lessonid,
    symbols: [],
    lesson: {}
  };

  componentDidMount = async () => {
    const lesson = await utils.fetchLesson(this.state.lessonId);
    const symbols = await utils.fetchSymbols(this.state.courseId)
    this.setState({ lesson: lesson.response, symbols });
    this.setState({ loaded: true });
  };

  render() {
    console.log(this.state.courseId, this.state.lessonId);
    return this.state.loaded ? (
      <Card
        height="10rem"
        width="100%"
        display="flex"
        alignItems="center"
        justifyContent="center"
        border="default">
        <Heading>{this.state.lesson.title}</Heading>
        <Icon icon="full-circle" color="green"></Icon>
      </Card>
    ) : null;
  }
}
