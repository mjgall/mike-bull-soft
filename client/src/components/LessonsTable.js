import React from 'react';
import { Table, Loader } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../actions';
import history from '../history';
import * as utils from '../utils';

class LessonsTable extends React.Component {
  state = { lessons: this.props.lessons, symbols: [] };

  getSymbols = lessons => {
    return Promise.all(
      lessons.map(async (lesson, index) => {
        const symbol = await utils.fetchSymbolsByLessons(lesson.id);
        return { index, symbol, lesson_id: lesson.id };
      })
    );
  };

  handleNav = id => {
    history.push(`/symbol/${id}`);
  };
  handleCreatorNav = id => {
    history.push(`/creator/symbol/${id}`);
  };

  renderTable() {
    return (
      <Table celled singleLine sortable>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Title</Table.HeaderCell>
            <Table.HeaderCell>Categories</Table.HeaderCell>
            <Table.HeaderCell># Symbols</Table.HeaderCell>
            <Table.HeaderCell>Create Date</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {this.props.app && this.props.lessons ? (
            this.props.lessons.map((lesson, index) => {
              return (
                <Table.Row key={index}>
                  <Table.Cell>
                    <Link to={`${this.props.location}/lesson/${lesson.id}`}>
                      {lesson.title}
                    </Link>
                  </Table.Cell>
                  <Table.Cell></Table.Cell>
                  <Table.Cell></Table.Cell>
                  <Table.Cell>
                    {new Date(lesson.create_date * 1000).toLocaleString()}
                  </Table.Cell>
                </Table.Row>
              );
            })
          ) : (
            <Loader active />
          )}
        </Table.Body>
      </Table>
    );
  }

  // renderCreatorTable() {
  //   return (
  //     <Table celled singleLine sortable>
  //       <Table.Header>
  //         <Table.Row>
  //           <Table.HeaderCell>ID</Table.HeaderCell>
  //           <Table.HeaderCell>Text</Table.HeaderCell>
  //           <Table.HeaderCell>Create Date</Table.HeaderCell>
  //         </Table.Row>
  //       </Table.Header>

  //       <Table.Body>
  //         {this.props.symbols.map((symbol, index) => {
  //           return (
  //             <Table.Row
  //               key={index}
  //               onClick={() => this.handleCreatorNav(symbol.id)}>
  //               <Table.Cell>{symbol.id}</Table.Cell>
  //               <Table.Cell>{symbol.text}</Table.Cell>
  //               <Table.Cell>
  //                 {new Date(symbol.create_date * 1000).toLocaleString()}
  //               </Table.Cell>
  //             </Table.Row>
  //           );
  //         })}
  //       </Table.Body>
  //     </Table>
  //   );
  // }

  render() {
    return this.renderTable();
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
)(LessonsTable);
