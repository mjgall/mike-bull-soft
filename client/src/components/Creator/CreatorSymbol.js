import React from 'react';

import { connect } from 'react-redux';
import * as actions from '../../actions';
import * as utils from '../../utils'

import { Grid, Button, Icon } from 'semantic-ui-react';

import ImagesTable from '../ImagesTable';
import Loader from '../Loader';

import AddSymbolModal from '../AddSymbolModal';

class Symbol extends React.Component {
  constructor(props) {
    super(props);
    this.audioPlayer = React.createRef();
  }

  state={course: null}
  
  componentDidMount = async () => {
    this.props.getSymbol(this.props.match.params.id);
    const course = await utils.fetchCourse(this.props.match.params.courseId, this.props.auth.id);
    this.setState({course})
  }

  componentWillUnmount() {
    this.props.clearSymbol();
  }

  playAudio = () => {
    this.audioPlayer.current.play();
  };
  
  rerenderAfterSubmit = () => {
    this.props.getSymbol(this.props.match.params.id);
  }

  render() {
    return (
      <React.Fragment>
        {this.props.app.symbol.symbol ? (
          <Grid.Column width={16}>
            <ul>
              <li>
                {this.props.app.symbol.symbol
                  ? this.props.app.symbol.symbol.id
                  : null}
              </li>
              <li>
                {this.props.app.symbol.symbol
                  ? this.props.app.symbol.symbol.text
                  : null}
              </li>
              <li>
                {this.props.app.symbol.symbol
                  ? new Date(
                      this.props.app.symbol.symbol.create_date * 1000
                    ).toLocaleString()
                  : null}
              </li>
            </ul>
            <Button onClick={this.playAudio}>
              <Icon name="play"></Icon>
            </Button>
            <audio ref={this.audioPlayer} id="audio-player">
              <source src={this.props.app.symbol.symbol.audio_url}></source>
            </audio>
            <ImagesTable />
            <AddSymbolModal
              courseId={ this.props.match.params.courseId }
              courseLanguage={ this.state.course.language }
              toggleShowModalCallback={ this.rerenderAfterSubmit }
              modalOpen={ this.state.showModal }
              existingSymbol
              symbolId={ this.props.match.params.id }
              existingSymbolText={this.props.app.symbol.symbol.text}
            >
              
            </AddSymbolModal>
          </Grid.Column>
        ) : (
          <Loader></Loader>
        )}
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    auth: state.auth,
    app: state.app
  };
};

export default connect(mapStateToProps, actions)(Symbol);
