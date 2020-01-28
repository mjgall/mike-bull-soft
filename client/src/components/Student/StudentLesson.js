import React from 'react';
// import { Heading, Card, Icon } from 'evergreen-ui';
import { Icon } from 'semantic-ui-react';
import Loader from '../Loader';
import * as utils from '../../utils';
import { connect } from 'react-redux';
import * as actions from '../../actions';

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
    error: ''
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
      this.setState({ challenges: response.challenges, loaded: true });
    } else if (!response.success && !response.error) {
      this.setState({ message: response.message });
    }
  };

  SymbolProgress = () => {
    const challenges = this.state.challenges;
    return (
      <div
        style={{
          margin: '3% 0',
          display: 'flex',
          justifyContent: 'space-between',
          flexWrap: 'wrap'
        }}>
        {challenges.map(challenge => {
          return <Icon style={{ fontSize: '40px' }} name="circle thin"></Icon>;
        })}
      </div>
    );
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
            <div style={{ height: '250px', width: '250px' }}>
              <img
                alt="a possibl answer"
                style={{ height: '100%', width: '100%' }}
                src={image.url}></img>
            </div>
          );
        })}
      </div>
    );
  };

  playAudio = () => {
    this.audioPlayer.current.play();
  };

  LessonControls = () => {
    console.log(this.state.challenges[0].audioUrl);
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
            <source src={this.state.challenges[0].audio_url}></source>
          </audio>
        </div>

        <div className="lesson-control-button" style={{ fontSize: '48px' }}>
          <Icon name="cancel"></Icon> Cancel Lesson
        </div>
      </div>
    );
  };

  render() {
    return this.state.loaded ? (
      <div style={{ width: '100%', height: '100%' }}>
        <h1>{this.state.lesson.title}</h1>
        <this.SymbolProgress></this.SymbolProgress>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr' }}>
          <this.ImageContainer
            images={this.state.challenges[0].images}></this.ImageContainer>
          <this.LessonControls></this.LessonControls>
        </div>
      </div>
    ) : (
      <Loader></Loader>
    );
  }
}

const mapStateToProps = state => {
  return { auth: state.auth };
};

export default connect(mapStateToProps, actions)(StudentLesson);
