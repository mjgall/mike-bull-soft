import React from 'react';
import { Grid, Button, Icon, Popup } from 'semantic-ui-react';
import { Slider } from 'react-semantic-ui-range';
import { Control, Errors } from 'react-redux-form';
import Form from './Form';
import { SketchPicker } from 'react-color';
import { connect } from 'react-redux';
import * as actions from '../actions';

const fabric = window.fabric;

class FabricCanvas extends React.Component {
  state = {
    svg: '',
    brush: {
      color: 'black',
      width: 10
    },
    freeDraw: false,
    images: []
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
      parseInt(this.state.brush.width, 10) || 10;
    this.props.canvas.isDrawingMode = true;
  };

  addImage = async () => {
    const pngDataURL = this.props.canvas.toDataURL({ format: 'png' });
    await this.setState({ images: [...this.state.images, pngDataURL] });
    await this.props.addSymbolImage(pngDataURL);
    this.clear();
  };

  renderImages = () => {
    return (
      <div>
        {this.props.app.symbolImages.map(image => {
          return <img width="30%" src={image}></img>;
        })}
      </div>
    );
  };

  render() {
    return (
      <Grid stackable>
        <Grid.Row>
          <Grid.Column width={6}>
            <Form
              model="forms.symbol"
              onSubmit={symbol => this.addSymbol(symbol)}
              className="ui form"
              validateOn="submit">
              <div className="fields" style={{ width: '110%' }}>
                <div className="field" style={{ width: '100%' }}>
                  <Control.text
                    model="forms.symbol.text"
                    placeholder="Symbol Text"
                    validators={{ required: value => value && value.length }}
                    validateOn="change"
                  />
                  <Errors
                    className="error"
                    model="forms.course.title"
                    show={{ touched: true, focus: false }}
                    messages={{
                      required: 'Required'
                    }}
                  />
                </div>
                {/* <button type="submit" className="ui button positive">
              Add Symbol
            </button> */}
              </div>
            </Form>
            <canvas
              id={this.props.id}
              width="300"
              height="300"
              style={{ border: '1px solid black' }}></canvas>
          </Grid.Column>
          <Grid.Column width={5}>
          <div>
              <Popup
                trigger={
                  <Button icon onClick={this.freeDraw}>
                    <Icon name="world" />
                  </Button>
                }
                content="Draw"
                position="bottom center"
              />

              <Popup
                trigger={
                  <Button icon onClick={this.clear}>
                    <Icon name="remove" />
                  </Button>
                }
                content="Clear"
                position="bottom center"
              />

              <Popup
                trigger={
                  <Button icon onClick={this.removeObject}>
                    <Icon name="minus square" />
                  </Button>
                }
                content="Remove Object"
                position="bottom center"
              />

              <Popup
                trigger={
                  <Button icon onClick={this.addImage}>
                    <Icon name="plus square" />
                  </Button>
                }
                content="Add to Symbol"
                position="bottom center"
              />
            </div>
            <SketchPicker
              width={'92%'}
              color={this.state.brush.color}
              className="colorpicker"
              onChangeComplete={this.handleChange}
            />
            <Slider
              value={this.state.brush.width}
              color="4A4A4A"
              settings={{    min: 0,
                max: 100,
                step: 1,
                onChange: value => {
                  this.setState({ brush: { ...this.state.brush, width: value } });
                  this.updateFreeDraw();
                }}}
            />
          </Grid.Column>
          <Grid.Column width={5}>
            
            <div>{this.renderImages()}</div>
          </Grid.Column>
        </Grid.Row>
      </Grid>
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
)(FabricCanvas);
