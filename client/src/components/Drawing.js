import React from 'react';

import FabricCanvas from './FabricCanvas';
const fabric = window.fabric;
export default class Drawing extends React.Component {
  componentDidMount() {
    this.canvas = new fabric.Canvas('canvas');
  }

  render() {
    return <FabricCanvas id="canvas" canvas={this.canvas}></FabricCanvas>;
  }
}
