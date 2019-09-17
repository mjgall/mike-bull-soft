import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';
import FabricCanvas from './FabricCanvas';
const fabric = window.fabric;


class SymbolForm extends React.Component {
  componentDidMount() {
    this.canvas = new fabric.Canvas('canvas' );
  }

  addSymbol = symbol => {
    this.props.addSymbol({
      owner_id: this.props.auth.id,
      course_id: this.props.app.course.course_id,
      text: symbol.text,
      language: this.props.app.course.language
    });
  };

  render() {
    return (
      <div>
        <FabricCanvas id="canvas" canvas={this.canvas} ></FabricCanvas>    
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    auth: state.auth,
    app: state.app,
    forms: state.forms
  };
};

export default connect(
  mapStateToProps,
  actions
)(SymbolForm);
