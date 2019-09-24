import React from 'react';

import ProfileCard from '../ProfileCard';
import CourseForm from '../CourseForm';

import CoursesTable from '../CoursesTable';

import { Grid, Modal, Button } from 'semantic-ui-react';
import { connect } from 'react-redux';
import * as actions from '../../actions';

import {Switch, Route } from 'react-router-dom'
import CreatorCourse from './CreatorCourse';
import CreatorHome from './CreatorHome';
import CreatorSymbol from './CreatorSymbol';

class Creator extends React.Component {
  state = { open: false };

  componentDidMount() {
    this.props.setCreatorMode();
    document.addEventListener("click", e => {
      if (e.target.className.indexOf("dimmer") > 0 ) {
        this.close();
      }
    })
  }

  open = () => {
    this.setState({ open: true });
  };

  close = () => {
    this.props.resetForm('forms.course', {language: 'english', difficulty: 'novice'})
    this.setState({ open: false });
  };

  submit = () => {
    console.log(this.props.forms.course)
    this.props.addCourse({
      title: this.props.forms.course.title,
      language: this.props.forms.course.language,
      description: this.props.forms.course.description,
      difficulty: this.props.forms.course.difficulty,
      owner_id: this.props.auth.google_id
    });
    this.close();
  };

  routes = () => {
    return (
      <Switch>
        <Route exact path={`${this.props.match.url}/`} component={CreatorHome}></Route>
        <Route exact path={`${this.props.match.url}/course/:id`} component={CreatorCourse}></Route>
        <Route exact path={`${this.props.match.url}/symbol/:id`} component={CreatorSymbol}></Route>
      </Switch>
    )
  }


  // render() {
  //   return (
  //     <React.Fragment>
  //       <Grid.Column width={4}>
  //         <ProfileCard />
  //       </Grid.Column>
  //       <Grid.Column width={12}>
  //         <h2>My Created Courses</h2>
  //         <Modal
  //           trigger={
  //             <Button onClick={this.open} positive>
  //               Add A Course
  //             </Button>
  //           }
  //           open={this.state.open}>
  //           <Modal.Header>Add a Course</Modal.Header>
  //           <Modal.Content>
  //             <Modal.Description>
  //               <CourseForm />
  //             </Modal.Description>
  //           </Modal.Content>
  //           <Modal.Actions>
  //             <Button onClick={this.close} negative>
  //               Cancel
  //             </Button>
  //             <Button
  //               onClick={this.submit}
  //               positive
  //               labelPosition="right"
  //               icon="checkmark"
  //               content="Add"
  //             />
  //           </Modal.Actions>
  //         </Modal>
          
  //         <CoursesTable />
  //       </Grid.Column>
  //     </React.Fragment>
  //   );
  // }

  render() {
    return this.routes()
  }

}


const mapStateToProps = state => {
  return { auth: state.auth, app: state.app, forms: state.forms };
};

export default connect(
  mapStateToProps,
  actions
)(Creator);
