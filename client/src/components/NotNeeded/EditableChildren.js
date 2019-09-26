import React from 'react';
import { Formik } from 'formik';

export default class EditableField extends React.Component {
  state = { editing: false, fieldClicked: null, fieldValue: '' };

  toggleView = click => {
    if (click) {
      this.setState({ fieldValue: click.target.innerHTML });
      this.setState({ fieldClicked: click.target });
    }
    this.setState({ editing: !this.state.editing });
  };

  renderViewing = () => {
    return this.props.children.map((child, index) => {
      return (
        <div key={index} onClick={this.toggleView}>
          {child}
        </div>
      );
    });
  };

  renderChildren = props => {
    const allChildren = this.props.children;
    const clickedField = this.state.fieldClicked;

    const findChildElementById = (children, id) => {
      for (let i = 0; i < children.length; i++) {
        if (children[i].props.id === id) {
          return { index: i, childElement: children[i] };
        }
      }
    };

    //takes in all the children and the child that was clicked, returns new elements with the clickedchild as an input
    const setOrder = (allChildren, clickedChild) => {
      const handleChange = e => {
        this.setState({ fieldValue: e.target.value });
      };
      return allChildren.map((child, index) => {
        if (clickedChild.index === index) {
          return (
            <div className="fields">
              <input
                type="text"
                onChange={handleChange}
                onBlur={props.handleBlur}
                name={child.props.id}
                placeholder={child.props.children}
                value={this.state.fieldValue}
              />
              <button type="submit" className="ui button">
                Submit
              </button>
            </div>
          );
        } else {
          return child;
        }
      });
    };

    return (
      <form onSubmit={props.handleSubmit} className="ui form">
        {setOrder(
          allChildren,
          findChildElementById(allChildren, clickedField.id)
        )}
        {props.errors.name && <div id="feedback">{props.errors.test}</div>}
      </form>
    );
  };

  renderEditing = () => {
    return (
      <Formik
        onClick={this.toggleView}
        onSubmit={(values, actions) => {
          this.toggleView();
        }}>
        {props => {
          return this.renderChildren(props);
        }}
      </Formik>
    );
  };

  render() {
    if (this.state.editing) {
      return this.renderEditing();
    } else {
      return this.renderViewing();
    }
  }
}
