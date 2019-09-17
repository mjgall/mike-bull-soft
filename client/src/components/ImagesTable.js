import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';

class ImagesTable extends React.Component {
  componentWillUnmount() {
    this.props.clearSymbol();
  }

  render() {
    return (
      <div>
        {this.props.app.symbol.images
          ? this.props.app.symbol.images.map((image, index) => {
              return (
                <img
                  key={index}
                  src={image.url}
                  alt=""
                  className="symbol-image"></img>
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
