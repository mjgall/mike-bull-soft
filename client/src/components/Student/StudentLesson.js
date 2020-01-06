import React from 'react';
// import { Heading, Card, Icon } from 'evergreen-ui';
import { Tab, Icon } from 'semantic-ui-react';
import Loader from '../Loader';
import * as utils from '../../utils';

export default class StudentLesson extends React.Component {
  constructor(props) {
    super(props);
    this.audioPlayer = React.createRef();
  }

  state = {
    loaded: false,
    courseId: this.props.match.params.courseid,
    lessonId: parseInt(this.props.match.params.lessonid),
    symbols: [],
    lesson: {}
  };

  componentDidMount = async () => {
  
    const lesson = await utils.fetchLesson(this.state.lessonId);
    const symbols = await utils.fetchSymbols(this.state.courseId);
    const randomImages = await utils.fetchRandomImages(4);
    
    
    this.setState({ lesson: lesson.response, symbols });
    this.setState({ images: randomImages.response });
    // const challenege = await utils.createChallenge(this.state.lessonId, this.state.symbols[0].id); 
    // console.log(challenege)
    this.setState({ loaded: true });
  };

  SymbolProgress = () => {
    const symbols = this.state.symbols;
    return (
      <div
        style={ {
          margin: '3% 0',
          display: 'flex',
          justifyContent: 'space-between',
          flexWrap: 'wrap'
        } }>
        { symbols.map(symbol => {
          return <Icon style={ { fontSize: '40px' } } name="circle thin"></Icon>;
        }) }
      </div>
    );
  };

  ImageContainer = props => {
    const { images } = props;
    return (
      <div
        style={ {
          width: '500px',
          height: '500px',
          border: '1px solid black',
          display: 'grid',
          gridTemplateColumns: '1fr 1fr'
        } }>
        { images.map(image => {
          return (
            <div style={ { height: "250px", width: "250px" } }>
              <img style={ { height: "100%", width: "100%" } } src={ image.url }></img>
            </div>
          )
        }) }
      </div>
    );
  };

  playAudio = () => {
    this.audioPlayer.current.play();
  };

  LessonControls = () => {
    return (
      <div style={ { display: 'grid', gridRowGap: '50px', justifyItems: 'left', alignItems: 'center' } }>
        <div className="lesson-control-button" style={ { fontSize: '48px' } } onClick={ this.playAudio }>
          <Icon name="play"></Icon> Play
          <audio ref={ this.audioPlayer } id="audio-player">
            <source src={ this.state.symbols[0].audio_url }></source>
          </audio>
        </div>

        <div className="lesson-control-button" style={ { fontSize: '48px' } }>
          <Icon name="cancel"></Icon> Cancel Lesson
        </div>
      </div>
    )
  }

  render() {
    return this.state.loaded ? (
      <div style={ { width: '100%', height: '100%' } }>
        <h1>{ this.state.lesson.title }</h1>
        <this.SymbolProgress></this.SymbolProgress>
        <div style={ { display: 'grid', gridTemplateColumns: '1fr 1fr' } }>
          <this.ImageContainer images={ this.state.images }></this.ImageContainer>
          <this.LessonControls></this.LessonControls>
        </div>
      </div>
    ) : (
        <Loader></Loader>
      );
  }
}
