import React from 'react';
import { Modal, Button } from 'semantic-ui-react';

import { connect } from 'react-redux';
import * as actions from '../actions';

import SymbolForm from './SymbolForm';

class AddSymbolModal extends React.Component {
  state = { modalOpen: this.props.modalOpen, isSubmitting: false, alertMessage: '', alert: false };

  componentWillMount() {
    document.addEventListener('click', e => {
      if (e.target.className.indexOf('dimmer') > 0) {
        this.close();
      }
    });
  }

  clearSymbolImages = () => {
    this.props.clearSymbolImages();
  };

  close = () => {
    this.setState({ modalOpen: false });
    this.props.resetForm('forms.symbol');
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

  updateParent() {
    this.props.toggleShowModalCallback();
  }

  submit = async () => {
    const formValue = this.props.form.text;
    if (this.props.app.symbolImages.length === 0 || !formValue) {
      this.setState({
        alert: true,
        alertMessage: 'Please submit at least one drawing and text.'
      });
      setTimeout(() => {
        this.setState({
          alert: false,
          alertMessage: ''
        })
      }, 1500)
      
    } else {
      this.setState({ isSubmitting: true });
      await this.props.addSymbol({
        owner_id: this.props.auth.id,
        course_id: this.props.courseId,
        text: formValue,
        language: this.props.courseLanguage,
        images: this.props.app.symbolImages
      });
      this.setState({ isSubmitting: false });
      this.close();
      this.updateParent();
    }
  };

  render() {
    return (
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
          {this.state.alert ? (
            <div className="alert">{this.state.alertMessage}</div>
          ) : null}

          <Modal.Description>
            <SymbolForm />
          </Modal.Description>
        </Modal.Content>
        <Modal.Actions>
          <Button onClick={this.close} negative>
            Cancel
          </Button>
          {this.state.isSubmitting ? (
            <Button loading positive>
              Loading
            </Button>
          ) : (
            <Button
              onClick={this.submit}
              positive
              labelPosition="right"
              icon="checkmark"
              content="Add"
            />
          )}
        </Modal.Actions>
      </Modal>
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

export default connect(mapStateToProps, actions)(AddSymbolModal);
