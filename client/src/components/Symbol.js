import React from 'react';

import { connect } from 'react-redux';
import * as actions from '../actions';

import { Grid } from 'semantic-ui-react';

import ProfileCard from './ProfileCard';
import ImagesTable from './ImagesTable';
import Loader from './Loader';

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
        <Grid.Column width={4} style={{ overflow: 'initial' }}>
          <ProfileCard />
        </Grid.Column>
        {this.props.app.symbol.symbol ? (
          <Grid.Column width={12}>
            <ul>
              <li>
                {this.props.app.symbol.symbol
                  ? this.props.app.symbol.symbol.id
                  : null}
              </li>
              <li>
                {this.props.app.symbol.symbol
                  ? this.props.app.symbol.symbol.text
                  : null}
              </li>
              <li>
                {this.props.app.symbol.symbol
                  ? new Date(
                      this.props.app.symbol.symbol.create_date * 1000
                    ).toLocaleString()
                  : null}
              </li>
            </ul>
            <ImagesTable />
          </Grid.Column>
        ) : (
          <Loader></Loader>
        )}
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
