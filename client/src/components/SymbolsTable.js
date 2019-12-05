import React from 'react';
import { Table, Loader } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../actions';
import history from '../history';

class SymbolsTable extends React.Component {
  handleNav = id => {
    history.push(`/student/symbol/${id}`);
  };
  handleCreatorNav = id => {
    history.push(`/creator/symbol/${id}`);
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
        {this.props.symbols.map((symbol, index) => {
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

  renderCreatorTable() {
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
          {this.props.symbols.map((symbol, index) => {
            return (
              <Table.Row key={index} onClick={() => this.handleCreatorNav(symbol.id)}>
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

export default connect(
  mapStateToProps,
  actions
)(SymbolsTable);
