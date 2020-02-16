import React from 'react';

export default class CompletedLesson extends React.Component {
  componentDidMount = () => {
    console.log(this.props);
  };

  render = () => {
    return (
      <React.Fragment>
        <h2>Congratulations, you've completed this lesson!</h2>
        <div>
          {this.props.correct.length} / {this.props.correct.length + this.props.incorrect.length}
        </div>
      </React.Fragment>
    );
  };
}
