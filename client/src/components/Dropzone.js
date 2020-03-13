import React from 'react';

import { connect } from 'react-redux';
import * as actions from '../actions';

import ReactDropzone from 'react-dropzone';

class Dropzone extends React.Component {
  state = {
    files: []
  };

  // Takes a data URI and returns the Data URI corresponding to the resized image at the wanted size.
  resizedataURL = (datas, wantedWidth, wantedHeight) => {
    return new Promise((resolve, reject) => {
      var img = document.createElement('img');
      img.onload = function() {
        var canvas = document.createElement('canvas');
        var ctx = canvas.getContext('2d');
        canvas.width = wantedWidth;
        canvas.height = wantedHeight;
        ctx.drawImage(this, 0, 0, wantedWidth, wantedHeight);

        var dataURI = canvas.toDataURL();
        resolve(dataURI);
      };
      img.src = datas;
    });
  };

  onDrop = files => {
    this.renderImages(files);
  };

  renderImages = files => {
    files.forEach(file => {
      console.log(file);
      const reader = new FileReader();
      reader.onabort = () => console.log('file reading was aborted');
      reader.onerror = () => console.log('file reading has failed');
      reader.onload = async () => {
        let base64String = btoa(
          new Uint8Array(reader.result).reduce(function(data, byte) {
            return data + String.fromCharCode(byte);
          }, '')
        );
        const dataURI = await this.resizedataURL(
          `data:image/jpeg;base64,${base64String}`,
          300,
          300
        );
        this.setState({
          files: [...this.state.files, { details: file, dataURI }]
        });
        this.props.addSymbolImage(dataURI);
      };
      reader.readAsArrayBuffer(file);
    });
  };

  render() {
    return (
      <ReactDropzone onDrop={this.onDrop}>
        {({ getRootProps, getInputProps }) => (
          <section className="container">
            <div {...getRootProps({ className: 'dropzone' })}>
              <input {...getInputProps()} />
              {this.props.children}
            </div>
            <aside>
              <ul>
                {this.state.files.map(file => {
                  return <li>{(file.details.size / 1000).toFixed(0)} kb</li>;
                })}
              </ul>
            </aside>
          </section>
        )}
      </ReactDropzone>
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

export default connect(mapStateToProps, actions)(Dropzone);
