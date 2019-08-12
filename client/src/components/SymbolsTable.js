import React from 'react';
import { Table } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../actions';

class SymbolsTable extends React.Component {
  render() {
    return (
      <Table celled singleLine sortable>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>ID</Table.HeaderCell>
            <Table.HeaderCell>Text</Table.HeaderCell>
            <Table.HeaderCell>Audio URL</Table.HeaderCell>
            <Table.HeaderCell>Create Date</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {this.props.app && this.props.app.symbolsTable
            ? this.props.app.symbolsTable.map((symbol, index) => {
                return (
                  <Table.Row key={index}>
                    <Table.Cell>{symbol.id}</Table.Cell>
                    <Table.Cell>{symbol.text}</Table.Cell>
                    <Table.Cell>{symbol.audio_url}</Table.Cell>
                    <Table.Cell>
                      {new Date(symbol.create_date * 1000).toLocaleString()}
                    </Table.Cell>
                  </Table.Row>
                );
              })
            : null}
        </Table.Body>
      </Table>
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
)(SymbolsTable);
