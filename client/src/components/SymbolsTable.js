import React from 'react';
import { Table, Icon } from 'semantic-ui-react';

import { connect } from 'react-redux';
import * as actions from '../actions';
import * as utils from '../utils';
import history from '../history';
import ConfirmDelete from './ConfirmDelete';

class SymbolsTable extends React.Component {
  state = { symbols: this.props.symbols };

  handleNav = id => {
    history.push(`/student/symbol/${id}`);
  };
  handleCreatorNav = id => {
    history.push(`/creator/course/${this.props.courseId}/symbol/${id}`);
  };

  renderStudentTable() {
    return (
      <Table compact celled singleLine sortable>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>ID</Table.HeaderCell>
            <Table.HeaderCell>Text</Table.HeaderCell>
            <Table.HeaderCell>Create Date</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {this.state.symbols.map((symbol, index) => {
            return (
              <Table.Row key={index} onClick={() => this.handleNav(symbol.id)}>
                <Table.Cell>{symbol.id}</Table.Cell>
                <Table.Cell>{symbol.text}</Table.Cell>
                <Table.Cell>
                  {new Date(symbol.create_date * 1000).toLocaleString()}
                </Table.Cell>
              </Table.Row>
            );
          })}
        </Table.Body>
      </Table>
    );
  }

  deleteSymbol = async (symbolId, index, userId) => {
    console.log({ symbolId }, { index }, { userId });
    await utils.deleteSymbol(symbolId);
    const symbols = [...this.state.symbols];
    symbols.splice(index, 1);
    this.setState({ symbols });
  };

  renderCreatorTable() {
    return (
      <Table compact celled singleLine sortable>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>ID</Table.HeaderCell>
            <Table.HeaderCell>Text</Table.HeaderCell>
            <Table.HeaderCell>Create Date</Table.HeaderCell>
            <Table.HeaderCell>Delete</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {this.state.symbols.map((symbol, index) => {
            return (
              <Table.Row key={index}>
                <Table.Cell>{symbol.id}</Table.Cell>
                <Table.Cell onClick={() => this.handleCreatorNav(symbol.id)}>
                  {symbol.text}
                </Table.Cell>
                <Table.Cell>
                  {new Date(symbol.create_date * 1000).toLocaleString()}
                </Table.Cell>

                <ConfirmDelete
                  recordId={symbol.id}
                  index={index}
                  recordType="symbol"
                  deleteFunction={this.deleteSymbol}
                  trigger={
                    <Table.Cell>
                      <Icon name="delete" style={{ color: 'red' }}></Icon>
                    </Table.Cell>
                  }></ConfirmDelete>
              </Table.Row>
            );
          })}
        </Table.Body>
      </Table>
    );
  }

  render() {
    if (this.props.app.creatorMode) {
      return this.renderCreatorTable();
    } else {
      return this.renderStudentTable();
    }
  }
}

//this is a test

const mapStateToProps = state => {
  return {
    auth: state.auth,
    app: state.app
  };
};

export default connect(mapStateToProps, actions)(SymbolsTable);
