import React from 'react';
import { Table, Card, Image } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../actions';

class ImagesTable extends React.Component {
  componentWillUnmount() {
    this.props.clearSymbol();
  }

  renderStudentTable() {
    return (
      <Table celled singleLine sortable>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>ID</Table.HeaderCell>

            <Table.HeaderCell>Audio URL</Table.HeaderCell>
            <Table.HeaderCell>Create Date</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {this.props.app && this.props.app.symbol.images
            ? this.props.app.symbol.images.map((image, index) => {
                return (
                  <Table.Row key={index}>
                    <Table.Cell>
                      <Link to={`/image/${image.id}`}>{image.id}</Link>
                    </Table.Cell>

                    <Table.Cell>
                      <img style={{ width: '20%' }} src={image.url} />
                    </Table.Cell>
                    <Table.Cell>
                      {new Date(image.create_date * 1000).toLocaleString()}
                    </Table.Cell>
                  </Table.Row>
                );
              })
            : null}
        </Table.Body>
      </Table>
    );
  }

  renderCreatorTable() {
    return (
      <Table celled singleLine sortable>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>ID</Table.HeaderCell>

            <Table.HeaderCell>Image</Table.HeaderCell>
            <Table.HeaderCell>Create Date</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {this.props.app && this.props.app.symbol.images
            ? this.props.app.symbol.images.map((image, index) => {
                return (
                  <Table.Row key={index}>
                    <Table.Cell>
                      <Link to={`/symbol/${image.id}`}>{image.id}</Link>
                    </Table.Cell>

                    <Table.Cell>
                      <img style={{ width: '20%' }} src={image.url} />
                    </Table.Cell>
                    <Table.Cell>
                      {new Date(image.create_date * 1000).toLocaleString()}
                    </Table.Cell>
                  </Table.Row>
                );
              })
            : null}
        </Table.Body>
      </Table>
    );
  }

  render() {
    // if (this.props.app.creatorMode) {
    //   return this.renderCreatorTable();
    // } else {
    //   return this.renderStudentTable();
    // }
    return (
      <div>
        {this.props.app.symbol.images
          ? this.props.app.symbol.images.map((image, index) => {
              return (
                <img key={index} src={image.url} style={{ width: '20%', height: '20%' }} ></img>
              );
            })
          : null}
     </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    auth: state.auth,
    app: state.app
  };
};

export default connect(
  mapStateToProps,
  actions
)(ImagesTable);
