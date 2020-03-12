import React from 'react';
import * as utils from '../../utils';

export default class CreatorLesson extends React.Component {
  state = { symbols: [] };

  componentDidMount = async () => {
    const symbols = await utils.fetchSymbolsByLessons(
      this.props.match.params.lessonId
    );
    this.setState({ symbols });
  };

  render() {
    return (
      <div>
        Hello, the course id is {this.props.match.params.courseId} and the
        lesson id is {this.props.match.params.lessonId}.
        <div>
          <ul>
            {this.state.symbols.map(symbol => {
              return (
                <li>
                  <audio controls src={symbol.audio_url}></audio>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    );
  }
}
