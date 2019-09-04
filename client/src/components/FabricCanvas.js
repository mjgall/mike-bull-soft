import React from 'react';
import { Grid } from 'semantic-ui-react';
import { SketchPicker } from 'react-color';
const fabric = window.fabric;

export default class FabricCanvas extends React.Component {
  state = {
    svg: '',
    brush: {
      color: 'black',
      width: 25
    },
    freeDraw: false
  };

  addRect = () => {
    const rect = new fabric.Rect({
      left: 100,
      top: 100,
      bottom: 100,
      right: 100,
      fill: 'red',

      width: 200,
      height: 200
    });
    this.props.canvas.add(rect);
  };

  logSVG = () => {
    fabric.log(this.props.canvas.toSVG());
    this.setState({
      svg: this.props.canvas.toSVG({
        suppressPreamble: true
      })
    });
  };

  handleChange = async color => {
    await this.setState({ ...this.state, brush: {...this.state.brush, color: color.hex } });
    this.props.canvas.freeDrawingBrush.color = this.state.brush.color;
  };

  freeDraw = async () => {
    await this.setState({ ...this.state, freeDraw: !this.state.freeDraw });
    this.props.canvas.freeDrawingBrush.color = this.state.brush.color;
    this.props.canvas.freeDrawingBrush.width =
      parseInt(this.state.brush.width, 10) || 1;
    this.props.canvas.freeDrawingBrush.shadow = new fabric.Shadow({
      blur: parseInt(this.state.brush.shadowWidth, 10) || 0,
      offsetX: 0,
      offsetY: 0,
      affectStroke: true,
      color: this.state.brush.shadowColor
    });
    this.props.canvas.isDrawingMode = this.state.freeDraw;
  };

  clear = () => {
    this.props.canvas.clear();
  };

  removeObject = () => {
    this.props.canvas.remove(this.props.canvas.getActiveObject());
  };

  render() {
    return (
      <Grid stackable>
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
            <button onClick={this.freeDraw} type="button">
              Toggle freedraw
            </button>
            <button onClick={this.clear} type="button">
              Clear
            </button>
            <button onClick={this.removeObject} type="button">
              Remove Object
            </button>
            <SketchPicker
              color={this.state.brush.color}
              onChangeComplete={this.handleChange}
            />
          </div>
        </Grid.Column>
        <Grid.Column width={6}>
          <code>{this.state.svg}</code>
        </Grid.Column>
      </Grid>
    );
  }
}
