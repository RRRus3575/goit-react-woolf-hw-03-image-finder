import React, { Component } from "react";

class Form extends Component {
  state = {
    inputText: "",
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.submitForm(this.state.inputText);
  };

  handleChange = (e) => {
    this.setState({
      inputText: e.target.value,
    });
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input
          type="text"
          name="search"
          value={this.state.inputText}
          onChange={this.handleChange}
        />
      </form>
    );
  }
}

export default Form;
