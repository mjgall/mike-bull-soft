import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';
import ReactHover from 'react-hover';
import { Icon } from 'semantic-ui-react';

class ImagesTable extends React.Component {
  componentWillUnmount() {
    this.props.clearSymbol();
  }

  state = { isHovering: false };

  hover = image => {
    this.setState({ isHovering: true });
  };

  render() {
    return (
      <div>
        {this.props.app.symbol.images
          ? this.props.app.symbol.images.map((image, index) => {
              return (
                <ReactHover
                  options={{ followCursor: false, shiftX: 0, shiftY: 0 }}
                  key={index}>
                  <ReactHover.Trigger type="trigger">
                    <img
                      onMouseEnter={() => this.hover(image)}
                      src={image.url}
                      alt=""
                      className="symbol-image"></img>
                  </ReactHover.Trigger>
                  <ReactHover.Hover type="hover">
                    <div
                      >
                      <Icon
                           style={{
                            position: 'absolute',
                            bottom: '3px',
                            cursor: 'pointer',
                            color: 'red'
                          }}
                        onClick={() => {
                          console.log(image);
                        }}
                        name="delete"
                        size="big"></Icon>
                    </div>
                  </ReactHover.Hover>
                </ReactHover>
              );
            })
          : null}
      </div>
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
)(ImagesTable);
