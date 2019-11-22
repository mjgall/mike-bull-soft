import React from 'react'
import ReactDropzone from 'react-dropzone';

export default class Dropzone extends React.Component {

  state = {
    files: []
  }

  onDrop = (files) => {
    console.log(files)
    this.setState({files: [...this.state.files],  files})
  }

  render() {
    const files = this.state.files.map(file => (
      <li key={file.name}>
        {file.name} - {((file.size)/1000).toFixed()} kb
      </li>
    ));

    return (
      <ReactDropzone onDrop={this.onDrop}>
        {({getRootProps, getInputProps}) => (
          <section className="container">
            <div {...getRootProps({className: 'dropzone'})}>
              <input {...getInputProps()} />
              {this.props.children}
            </div>
            <aside>
            
              <ul>{files}</ul>
            </aside>
          </section>
        )}
      </ReactDropzone>
    );
  }
}