import React from 'react';
import Loader from '../Loader';

export default class CompletedLesson extends React.Component {
  state = {
    correct: this.props.correct,
    incorrect: this.props.incorrect,
    total: this.props.correct.length + this.props.incorrect.length,
    percent:
      (this.props.correct.length /
        (this.props.correct.length + this.props.incorrect.length)) *
      100,
    loaded: false
  };

  componentDidMount = () => {
    this.setState({ loaded: true });
  };

  render = () => {
    if (this.state.loaded) {
      return (
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
            textAlign: 'center'
          }}>
          <div>
            <h2>Congratulations, you've completed this lesson!</h2>
            <div>
              <div style={{color: 'white', padding: '20px', background: this.state.percent > 79 ? 'green' : 'red'}}>{this.state.percent}%</div>
            </div>
          </div>
        </div>
      );
    } else {
      return <Loader></Loader>;
    }
  };
}
