import React, { Component } from 'react';
import { connect } from 'react-redux';

// Basic class component structure for React with default state
// value setup. When making a new component be sure to replace
// the component name TemplateClass with the name for the new
// component.

// YOU CANNOT USE HOOKS IN CLASS COMPONENTS -- usually Higher Order Components are used instead
// Class Components have different syntax, including `this`

class TemplateClass extends Component {
  state = {
    heading: 'Class Component',
  };

  render() {
    return (
      <div>
        <h2>{this.state.heading}</h2>
      </div>
    );
  }
}

const mapStoreToProps = (reduxStore) => {
  return {
    store: reduxStore,
  };
};

export default connect(mapStoreToProps)(TemplateClass);
