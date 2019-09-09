import React from 'react';

import { connect } from 'react-redux';

import { Link } from 'react-router-dom';

import * as actions from '../actions';

import { Grid, Modal, Button } from 'semantic-ui-react';

import SymbolForm from './SymbolForm';
import SymbolsTable from './SymbolsTable';

class Course extends React.Component {
  state = { modalOpen: false };

  async componentDidMount() {
    await this.props.getCourse(this.props.match.params.course);
    await this.props.fetchSymbols(this.props.app.course.course_id);
  }

  componentWillUnmount() {
    this.props.clearCourse();
    this.props.clearSymbol();
  }

  renderDetails = () => {
    if (!this.props.app.course) {
      return (
        <div>
          <ul>
            <li>Title:</li>
            <li>Owner:</li>
            <li>ID:</li>
            <li>Create Date:</li>
          </ul>
          <p />
        </div>
      );
    } else {
      return (
        <div>
          <ul>
            <li>Title: {this.props.app.course.title}</li>
            <li>
              Owner: {this.props.app.course.first_name}{' '}
              {this.props.app.course.last_name}
            </li>
            <li>ID: {this.props.app.course.course_id}</li>
            <li>
              Create Date:{' '}
              {new Date(
                this.props.app.course.create_date * 1000
              ).toLocaleString()}
            </li>
          </ul>
          <p>{this.props.app.course.description}</p>
        </div>
      );
    }
  };

  clearSymbolImages = () => {
    this.props.clearSymbolImages();
  };

  close = () => {
    this.setState({ modalOpen: false });
    this.props.clearSymbolImages();
  };

  open = () => {
    this.setState({ modalOpen: true });
  };

  saveImages = arrayOfImages => {
    arrayOfImages.forEach(imageData => {
      const imageObject = {
        owner_id: this.props.auth.id,
        data: imageData
      };
      this.props.saveSymbolImage(imageObject);
    });
  };

  submit = () => {
    const formValue = this.props.form.text;
    this.props.addSymbol({
      owner_id: this.props.auth.id,
      course_id: this.props.app.course.course_id,
      text: formValue,
      language: this.props.app.course.language,
      images: this.props.app.symbolImages
    });
    this.close();
  };

  render() {
    return (
      <React.Fragment>
        <Grid.Column width={16}>
          <h4>
            <Link to="/home">Back to courses</Link>
          </h4>

          {this.renderDetails()}
          <h2>Symbols</h2>

          {this.props.app.creatorMode ? (
            <Modal
              trigger={
                <Button onClick={this.open} positive>
                  Add A Symbol
                </Button>
              }
              onClose={this.props.clearSymbolImages}
              open={this.state.modalOpen}>
              <Modal.Header>Add a Symbol</Modal.Header>
              <Modal.Content>
                <Modal.Description>
                  {this.props.app.creatorMode ? <SymbolForm /> : <SymbolForm />}
                </Modal.Description>
              </Modal.Content>
              <Modal.Actions>
                <Button onClick={this.close} negative>
                  Cancel
                </Button>
                <Button
                  onClick={this.submit}
                  positive
                  labelPosition="right"
                  icon="checkmark"
                  content="Add"
                />
              </Modal.Actions>
            </Modal>
          ) : null}
          <SymbolsTable />
        </Grid.Column>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    auth: state.auth,
    app: state.app,
    form: state.forms.symbol
  };
};

export default connect(
  mapStateToProps,
  actions
)(Course);
