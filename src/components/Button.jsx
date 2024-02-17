import React, { Component } from "react";

class Button extends Component {
  render() {
    return <button onClick={this.props.click}>Load More</button>;
  }
}

export default Button;
