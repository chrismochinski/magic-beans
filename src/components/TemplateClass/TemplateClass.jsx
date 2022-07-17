import React, { Component } from "react";
import { connect } from "react-redux";

class TemplateClass extends Component {
  state = {
    heading: "Class Component",
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
