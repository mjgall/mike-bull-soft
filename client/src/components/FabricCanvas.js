import React from 'react';
import { Grid } from 'semantic-ui-react';
const fabric = window.fabric;

export default class FabricCanvas extends React.Component {
  state = {
    svg: ''
  };

  addRect = () => {
    // create a rectangle object
    var rect = new fabric.Rect({
      left: 100,
      top: 100,
      bottom: 100,
      right: 100,
      fill: 'red',

      width: 200,
      height: 200
    });

    // "add" rectangle onto canvas
    this.props.canvas.add(rect);
  };

  logSVG = () => {
    fabric.log(
      this.props.canvas.toSVG({
        suppressPreamble: true
      })
    );
    this.setState({
      svg: this.props.canvas.toSVG({
        suppressPreamble: true
      })
    });
  };

  render() {
    console.log(this);
    return (
      <Grid>
        <Grid.Column width={10}>
          <canvas
            id={this.props.id}
            width="600"
            height="600"
            style={{ border: '1px solid black' }}></canvas>
          <div>
            <button onClick={this.addRect} type="button">
              Add a rectangle
            </button>
            <button onClick={this.logSVG} type="button">
              Show SVG
            </button>
          </div>
        </Grid.Column>
        <Grid.Column width={6}>
          <code>{this.state.svg}</code>
        </Grid.Column>
      </Grid>
    );
  }
}
