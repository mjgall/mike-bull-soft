import React from 'react';

import { connect } from 'react-redux';
import * as actions from '../actions';

import { Grid } from 'semantic-ui-react';

import ProfileCard from './ProfileCard';
import SymbolsTable from './SymbolsTable';

class Symbol extends React.Component {
  componentDidMount() {
    this.props.getSymbol(this.props.match.params.symbol);
  }

  componentWillUnmount() {
    this.props.clearSymbol();
  }

  render() {
    return (
      <React.Fragment>
        <Grid.Column width={6} style={{ overflow: 'initial' }}>
          <ProfileCard />
        </Grid.Column>
        <Grid.Column width={10}>
          <ul>
            <li>
              ID:{' '}
              {this.props.app.symbol ? this.props.app.symbol.symbol_id : null}
            </li>
            <li>
              Title:{' '}
              {this.props.app.symbol ? this.props.app.symbol.title : null}
            </li>
            <li>
              Create Date:{' '}
              {this.props.app.symbol
                ? new Date(
                    this.props.app.symbol.create_date * 1000
                  ).toLocaleString()
                : null}
            </li>
          </ul>
          <SymbolsTable />
        </Grid.Column>
      </React.Fragment>
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
)(Symbol);
