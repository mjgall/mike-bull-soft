import React from 'react';
// import { Heading, Card, Icon } from 'evergreen-ui';
import { Icon } from 'semantic-ui-react';
import Loader from '../Loader';
import * as utils from '../../utils';
import { connect } from 'react-redux';
import * as actions from '../../actions';

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
    correct: null
  };
  componentDidUpdate = () => {
    console.log(this.state.currentChallenge);
  };

  componentDidMount = async () => {
    //challenges is an array of the challenge objects created on the server side. A challenge object contains a challenge id, an images array (imageUrl, imageId), and an audioUrl. It needs two arguments: userId and lessonId which are checked to find the

    const response = await utils.fetchChallengesByLesson(
      this.state.lessonId,
      this.props.auth.id
    );

    // console.log(challenges.length === 0);

    // if (challenges.length === 0) {
    //   const challenges = await utils.createChallengesByLesson(
    //     this.state.lessonId,
    //     this.props.auth.id
    //   );
    //   console.log(challenges);
    //   this.setState({ challenges, loaded: true });
    // }

    if (response.success) {
      this.setState({ challenges: response.challenges });
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

    this.setState({
      currentChallenge: lastChallenge,
      indexOfCurrentChallenge,
      loaded: true
    });
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
      console.log("That's all of them");
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
              style={{
                fontSize: '40px',
                color:
                  index === props.currentChallengeIndex ? 'yellow' : 'black'
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

    if (answerStatus.correct) {
      this.setState({ answerChecked: true, correct: true });
      setTimeout(() => this.nextChallenge(), 1000)
    } else {
      this.setState({ answerChecked: true, correct: false });
    }
    console.log(answerStatus.message);
  };

  ImageContainer = props => {
    const { images } = props;
    return (
      <div
        style={{
          width: '500px',
          height: '500px',
          border: '1px solid black',
          display: 'grid',
          gridTemplateColumns: '1fr 1fr'
        }}>
        {images.map(image => {
          return (
            <div
              style={{ height: '250px', width: '250px' }}
              onClick={() => this.submitAnswer(image.id)}>
              <img
                alt="a possible answer"
                style={{ height: '100%', width: '100%' }}
                src={image.url}></img>
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
    console.log(props.source);
    return (
      <div
        style={{
          display: 'grid',
          gridRowGap: '50px',
          justifyItems: 'left',
          alignItems: 'center'
        }}>
        <div
          className="lesson-control-button"
          style={{ fontSize: '48px' }}
          onClick={this.playAudio}>
          <Icon name="play"></Icon> Play
          <audio ref={this.audioPlayer} id="audio-player">
            <source src={props.source}></source>
          </audio>
        </div>

        <div className="lesson-control-button" style={{ fontSize: '48px' }} onClick={() => this.props.history.push(`/student/course/${this.state.courseId}`)}>
          <Icon name="cancel"></Icon> Cancel Lesson
        </div>
      </div>
    );
  };

  render() {
    if (!this.state.error) {
      return this.state.loaded ? (
        <div style={{ width: '100%', height: '100%' }}>
          <h1>{this.state.lesson.title}</h1>
          <this.SymbolProgress
            currentChallengeIndex={
              this.state.indexOfCurrentChallenge
            }></this.SymbolProgress>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr' }}>
            <this.ImageContainer
              images={
                this.state.challenges[this.state.indexOfCurrentChallenge].images
              }></this.ImageContainer>
            {this.state.answerChecked ? (
              this.state.correct ? (
                <div className="answer correct"><h1>Correct!</h1></div>
              ) : (
                <div className="answer incorrect"><h1>Wrong!</h1></div>
              )
            ) : null}
            <this.LessonControls
              source={
                this.state.challenges[this.state.indexOfCurrentChallenge]
                  .audio_url
              }></this.LessonControls>
          </div>
          {/* <button onClick={this.prevChallenge}>Previous challenge</button>
          <button onClick={this.nextChallenge}>Next challenge</button> */}
        </div>
      ) : (
        <Loader></Loader>
      );
    } else {
      throw new Error('Something went wrong');
    }
  }
}

const mapStateToProps = state => {
  return { auth: state.auth };
};

export default connect(mapStateToProps, actions)(StudentLesson);
