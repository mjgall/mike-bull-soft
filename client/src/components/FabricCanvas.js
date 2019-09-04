import React from 'react';
import { Grid, Label, Input } from 'semantic-ui-react';
import { Slider } from 'react-semantic-ui-range';
import { SketchPicker } from 'react-color';
import InputRange from 'react-input-range';
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
    await this.setState({
      ...this.state,
      brush: { ...this.state.brush, color: color.hex }
    });
    this.updateFreeDraw();
  };

  freeDraw = async () => {
    await this.setState({
      ...this.state,
      brush: { ...this.state.brush },
      freeDraw: !this.state.freeDraw
    });
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

  updateFreeDraw = () => {
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
    this.props.canvas.isDrawingMode = true;
  };

  settings = {
    min: 0,
    max: 100,
    step: 1,
    onChange: value => {
      this.setState({ brush: { ...this.state.brush, width: value } });
      this.updateFreeDraw();
    }
  };

  toPNG = () => {
    var a = document.createElement('a');
    a.href = this.props.canvas.toDataURL({
      format: 'png'
    });
    a.setAttribute('download', Date.now());
    a.click();
  };

  render() {
    return (
      <Grid stackable>
        <Grid.Column width={12}>
          <canvas
            id={this.props.id}
            width="600"
            height="600"
            style={{ border: '1px solid black' }}></canvas>
          <div>
            {/* <button onClick={this.logSVG} type="button">
              Show SVG
            </button> */}
            <button onClick={this.freeDraw} type="button" className="ui button">
              Toggle Draw Mode
            </button>
            <button onClick={this.clear} type="button" className="ui button">
              Clear Canvas
            </button>
            <button
              onClick={this.removeObject}
              type="button"
              className="ui button">
              Remove Selected Object
            </button>
            <button onClick={this.toPNG} type="button" className="ui button">
              Save As .png
            </button>
          </div>
        </Grid.Column>
        <Grid.Column width={4}>
          <SketchPicker
            color={this.state.brush.color}
            onChangeComplete={this.handleChange}
          />
          <Slider
            style={{ margin: '10px 10px' }}
            value={this.state.brush.width}
            color="4A4A4A"
            settings={this.settings}
          />
        </Grid.Column>
        <Grid.Column width={16}>
          <code>{this.state.svg}</code>
        </Grid.Column>
      </Grid>
    );
  }
}
