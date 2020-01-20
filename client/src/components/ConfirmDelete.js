import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';
import { Button, Popup } from 'semantic-ui-react';

class ConfirmDelete extends React.Component {
  state = { isOpen: false };

  handleClose = () => {
    this.setState({ isOpen: false });
  };

  handleOpen = () => {
    this.setState({ isOpen: true });
  };

  componentDidMount = () => {
    if (!this.props.recordType || !this.props.deleteFunction || !this.props.recordId || this.props.index === undefined) {

      throw Error('Missing a required prop')
    }
  }

  content = () => {
    const { recordId, index, recordType, deleteFunction } = this.props;
    return (
      <div>
        <p>Are you sure you want to permanently delete this {recordType}?</p>
        <Button
          color="red"
          content="Delete"
          size="tiny"
          onClick={() =>
            deleteFunction(recordId, index, this.props.auth.id)
          }
        />
        <Button
          color="grey"
          content="Cancel"
          size="tiny"
          onClick={this.handleClose}
        />
      </div>
    );
  };

  render() {
    return (
      <Popup
        open={this.state.isOpen}
        onOpen={this.handleOpen}
        onClose={this.handleClose}
        content={this.content}
        trigger={this.props.trigger}
        on="click"></Popup>
    );
  }
}
const mapStateToProps = state => {
  return {
    auth: state.auth,
    app: state.app
  };
};

export default connect(mapStateToProps, actions)(ConfirmDelete);
