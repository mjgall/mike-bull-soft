import React from 'react';

import FabricCanvas from './FabricCanvas';
const fabric = window.fabric;
export default class Drawing extends React.Component {
  componentDidMount() {
    this.canvas = new fabric.Canvas('c');
  }

  render() {
    return <FabricCanvas id="c" canvas={this.canvas}></FabricCanvas>;
  }
}
