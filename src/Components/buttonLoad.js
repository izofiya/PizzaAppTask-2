import React from "react";

export class ButtonLoad extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <button
        id="load-btn"
        className={this.props.className === false ? "button" : "button loading"}
        onClick={this.props.onClick}
      >
        Load
      </button>
    );
  }
}
