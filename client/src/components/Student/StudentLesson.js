import React from 'react';
// import { Heading, Card, Icon } from 'evergreen-ui';
import { Tab, Icon } from 'semantic-ui-react';
import Loader from '../Loader';
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
    const symbols = await utils.fetchSymbols(this.state.courseId);

    this.setState({ lesson: lesson.response, symbols });
    const panes = this.state.symbols.map(symbol => {
      return {
        // menuItem: () => <div><Icon name="dot circle"></Icon>{symbol.id}</div>,
        menuItem: symbol.id,
        render: () => <Tab.Pane>{symbol.text}</Tab.Pane>
      };
    });
    this.setState({ panes });
    this.setState({ loaded: true });
  };

  panes = [
    { menuItem: 'Tab 1', render: () => <Tab.Pane>Tab 1 Content</Tab.Pane> },
    { menuItem: 'Tab 2', render: () => <Tab.Pane>Tab 2 Content</Tab.Pane> },
    { menuItem: 'Tab 3', render: () => <Tab.Pane>Tab 3 Content</Tab.Pane> }
  ];

  render() {
    console.log(this.state);
    return this.state.loaded ? (
      <Tab
        style={{ width: '100%' }}
        menu={{ fluid: true, vertical: true }}
        menuPosition="right"
        panes={this.state.panes}
      />
    ) : (
      // <h1>Hello</h1>
      <Loader></Loader>
    );
  }
}
