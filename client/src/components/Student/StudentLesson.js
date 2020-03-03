import React from 'react';
// import { Heading, Card, Icon } from 'evergreen-ui';
import { Icon, Button } from 'semantic-ui-react';
import Loader from '../Loader';
import * as utils from '../../utils';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import CompletedLesson from './CompletedLesson';

function indexByProperty(array, attr, value) {
  for (var i = 0; i < array.length; i += 1) {
    if (array[i][attr] === value) {
      return i;
    }
  }
  return -1;
}

class StudentLesson extends React.Component {
  constructor(props) {
    super(props);
    this.audioPlayer = React.createRef();
  }

  state = {
    loaded: false,
    courseId: this.props.match.params.courseid,
    lessonId: this.props.match.params.lessonid,
    symbols: [],
    lesson: {},
    message: '',
    error: false,
    currentChallenge: null,
    indexOfCurrentChallenge: null,
    answerChecked: null,
    correct: null,
    lessonComplete: false,
    correctChallenges: [],
    incorrectChallenges: []
  };

  componentDidMount = async () => {
    const student_lesson = await utils.getStudentLesson(
      this.state.lessonId,
      this.props.auth.id
    );

    if (student_lesson.success) {
      const response = await utils.fetchChallengesByLesson(
        this.state.lessonId,
        this.props.auth.id
      );

      if (response.success) {
        //sort challenges by their id in ascending order, we could substitute this for an order index key set by the lesson creator if we wanted to later
        response.challenges.sort((a, b) => (a.id > b.id ? 1 : -1));

        const correctChallenges = response.challenges.filter(challenge => {
          if (challenge.status === 2) {
            return true;
          } else {
            return false;
          }
        });

        const incorrectChallenges = response.challenges.filter(challenge => {
          if (challenge.status === 3) {
            return true;
          } else {
            return false;
          }
        });

        this.setState({
          challenges: response.challenges,
          correctChallenges,
          incorrectChallenges
        });
      } else if (!response.success) {
        this.setState({ message: response.message, error: true });
        throw new Error(response.error);
      }

      const lastChallenge = (
        await utils.getLastCompletedChallenge(
          this.props.auth.id,
          this.state.lessonId
        )
      ).lastCompletedChallenge;

      //we now need to get the index of challenge by this id from this.state.challenges

      const indexOfCurrentChallenge = indexByProperty(
        this.state.challenges,
        'id',
        lastChallenge
      );

      if (indexOfCurrentChallenge === -1) {
        this.setState({ lessonComplete: true, loaded: true });
        
      } else {
        this.setState({
          currentChallenge: lastChallenge,
          indexOfCurrentChallenge,
          loaded: true
        });
      }
    } else if (student_lesson.completed == 1) {
      this.setState({ lessonComplete: true, loaded: true });
    }
  };

  prevChallenge = () => {
    if (this.state.indexOfCurrentChallenge === 0) {
      console.log('Nothing back here');
    } else {
      this.setState({
        indexOfCurrentChallenge: this.state.indexOfCurrentChallenge - 1,
        currentChallenge: this.state.challenges[
          this.state.indexOfCurrentChallenge - 1
        ].id,
        answerChecked: false,
        correct: null
      });
    }
  };

  nextChallenge = () => {
    if (
      this.state.indexOfCurrentChallenge + 1 ===
      this.state.challenges.length
    ) {
      this.setState({ lessonComplete: true });
    } else {
      this.setState({
        indexOfCurrentChallenge: this.state.indexOfCurrentChallenge + 1,
        currentChallenge: this.state.challenges[
          this.state.indexOfCurrentChallenge + 1
        ].id,
        answerChecked: false,
        correct: null
      });
    }
  };

  SymbolProgress = props => {
    const challenges = this.state.challenges;
    return (
      <div
        style={{
          margin: '3% 0',
          display: 'flex',
          justifyContent: 'space-between',
          flexWrap: 'wrap'
        }}>
        {challenges.map((challenge, index) => {
          return (
            <Icon
              className="progress-dot"
              style={{
                fontSize: '2rem',
                color:
                  index === props.currentChallengeIndex
                    ? 'blue'
                    : challenge.status === 2
                    ? 'green'
                    : challenge.status === 3
                    ? 'red'
                    : 'gray'
              }}
              name="circle thin"></Icon>
          );
        })}
      </div>
    );
  };

  submitAnswer = async id => {
    const answerStatus = await utils.submitAnswer(
      this.state.currentChallenge,
      id
    );

    // console.log([...this.state.correct, this.state.challenges[indexByProperty(this.state.challenges, 'id', this.state.currentChallenge)]])

    if (answerStatus.correct) {
      this.setState({
        correctChallenges: [
          ...this.state.correctChallenges,
          this.state.challenges[
            indexByProperty(
              this.state.challenges,
              'id',
              this.state.currentChallenge
            )
          ]
        ],
        answerChecked: true,
        correct: true,
        challenges: this.state.challenges.map((challenge, index) => {
          return index === this.state.indexOfCurrentChallenge
            ? { ...challenge, status: 2 }
            : challenge;
        })
      });
      //CHANGE STATUS OF CHALLENGE TO CORRECT HERE, SOMETHING LIKE utils.changeChallengeStatus(challengeId, newStatus)
      utils.changeChallengeStatus(this.state.currentChallenge, 2);
      setTimeout(() => this.nextChallenge(), 1000);
    } else {
      this.setState({
        incorrectChallenges: [
          ...this.state.incorrectChallenges,
          this.state.challenges[
            indexByProperty(
              this.state.challenges,
              'id',
              this.state.currentChallenge
            )
          ]
        ],
        answerChecked: true,
        correct: false,
        challenges: this.state.challenges.map((challenge, index) => {
          return index === this.state.indexOfCurrentChallenge
            ? { ...challenge, status: 3 }
            : challenge;
        })
      });
      //CHANGE STATUS OF CHALLENGE TO INCORRECT HERE, SOMETHING LIKE utils.changeChallengeStatus(challengeId, newStatus)
      utils.changeChallengeStatus(this.state.currentChallenge, 3);
      setTimeout(() => this.nextChallenge(), 1000);
    }
  };

  ImagesContainer = props => {
    const { images } = props;
    return (
      <div className="images-container">
        {images.map(image => {
          return (
            <div className="image-container">
              <img
                onClick={() => this.submitAnswer(image.id)}
                alt="a possible answer"
                className="image image-choice"
                src={image.url}
                style={{
                  border: '1px solid gray',
                  borderRadius: '5px',
                  cursor: 'pointer'
                }}></img>
            </div>
          );
        })}
      </div>
    );
  };

  playAudio = () => {
    this.audioPlayer.current.load();
    this.audioPlayer.current.play();
  };

  LessonControls = props => {
    return (
      <div className="lesson-control-buttons">
        <Button className="lesson-control-button" onClick={this.playAudio}>
          <Icon name="play"></Icon>Play
          <audio ref={this.audioPlayer} id="audio-player">
            <source src={props.source}></source>
          </audio>
        </Button>

        <Button
          className="lesson-control-button"
          onClick={() =>
            this.props.history.push(`/student/course/${this.state.courseId}`)
          }>
          <Icon name="cancel"></Icon>Cancel
        </Button>
      </div>
    );
  };

  render() {
    try {
      if (!this.state.error) {
        return this.state.loaded ? (
          this.state.lessonComplete ? (
            <CompletedLesson
              correct={this.state.correctChallenges}
              incorrect={this.state.incorrectChallenges}></CompletedLesson>
          ) : (
            <div>
              <div className="controls-and-progress">
                <this.LessonControls
                  source={
                    this.state.challenges[this.state.indexOfCurrentChallenge]
                      .audio_url
                  }></this.LessonControls>
                <this.SymbolProgress
                  currentChallengeIndex={
                    this.state.indexOfCurrentChallenge
                  }></this.SymbolProgress>
              </div>

              <this.ImagesContainer
                images={
                  this.state.challenges[this.state.indexOfCurrentChallenge]
                    .images
                }></this.ImagesContainer>
              {this.state.answerChecked ? (
                this.state.correct ? (
                  <div className="answer correct">
                    <h1>Correct!</h1>
                  </div>
                ) : (
                  <div className="answer incorrect">
                    <h1>Wrong!</h1>
                  </div>
                )
              ) : null}
            </div>
          )
        ) : (
          <Loader></Loader>
        );
      } else {
        console.log(this.state.error);
        throw new Error('Something went wrong');
      }
    } catch (error) {
      console.log(this.state.error);
      throw new Error('Something went wrong');
    }
  }
}

const mapStateToProps = state => {
  return { auth: state.auth };
};

export default connect(mapStateToProps, actions)(StudentLesson);
