import { useState } from "react";
import React, { Component } from "react";

import "./App.css";

import getAPI from "./components/API";
import Render from "./components/renderElements";

export class App extends Component {
  state = {
    data: null,
    search: "",
    loading: false,
  };
  handleSubmit = async (e) => {
    e.preventDefault();
    console.log("start");
    this.setState({
      loading: true,
      data: null,
    });
    const data = await getAPI(this.state.search);
    console.log(data);
    this.setState({
      data,
      loading: false,
    });
  };

  handleChange = (e) => {
    e.preventDefault();
    console.log(e.target.value);
    this.setState({
      search: e.target.value,
    });
  };

  render() {
    return (
      <>
        <form onSubmit={this.handleSubmit}>
          <input type="text" onChange={this.handleChange} />
        </form>

        <ul>
          {this.state.loading && <div className="load">Loading...</div>}
          {/* {this.state.data && this.state.data.hits[0].previewURL} */}
          {this.state.data && <Render data={this.state.data} />}
        </ul>
      </>
    );
  }
}

export default App;
