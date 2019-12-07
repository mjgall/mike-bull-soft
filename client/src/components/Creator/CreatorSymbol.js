import React from 'react';

import { connect } from 'react-redux';
import * as actions from '../../actions';

import { Grid, Button, Icon } from 'semantic-ui-react';

import ProfileCard from '../ProfileCard';
import ImagesTable from '../ImagesTable';
import Loader from '../Loader';

class Symbol extends React.Component {
  constructor(props) {
    super(props);
    this.audioPlayer = React.createRef();
  }

  componentDidMount() {
    this.props.getSymbol(this.props.match.params.id);
  }

  componentWillUnmount() {
    this.props.clearSymbol();
  }

  playAudio = () => {
    this.audioPlayer.current.play();
  };

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

export default connect(
  mapStateToProps,
  actions
)(Symbol);
