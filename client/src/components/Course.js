import React from 'react';

import { connect } from 'react-redux';

import {Link} from 'react-router-dom';

import * as actions from '../actions';

import { Grid } from 'semantic-ui-react';

import SymbolForm from './SymbolForm';
import SymbolsTable from './SymbolsTable';

class Course extends React.Component {
  async componentDidMount() {
    await this.props.getCourse(this.props.match.params.course);
    await this.props.fetchSymbols(this.props.app.course.course_id);
  }

  componentWillUnmount() {
    this.props.clearCourse();
    this.props.clearSymbol();
  }

  render() {
    return (
      <React.Fragment>
        <Grid.Column width={16}>
          <h4><Link to="/home">Back to courses</Link></h4>
          <h2>{this.props.app.course ? this.props.app.course.title : null}</h2>
          <ul>
            <li>
              ID:{' '}
              {this.props.app.course ? this.props.app.course.course_id : null}
            </li>
            <li>
              Create Date:{' '}
              {this.props.app.course
                ? new Date(
                    this.props.app.course.create_date * 1000
                  ).toLocaleString()
                : null}
            </li>
          </ul>
          <h2>Symbols</h2>
          
          <SymbolForm />
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
)(Course);
