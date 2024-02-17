import { useState } from "react";
import React, { Component } from "react";
import { Audio } from "react-loader-spinner";
import "./App.css";
import Button from "./components/Button";
import getAPI from "./components/API";
import Render from "./components/renderElements";
import Modal from "./components/modal";

export class App extends Component {
  state = {
    data: null,
    search: "",
    loading: false,
    isActive: false,
    page: 1,
    allObjects: 1,
  };
  handleSubmit = async (e) => {
    e.preventDefault();
    console.log("start");
    this.setState({
      loading: true,
      data: null,
      page: 1,
      allPages: 1,
    });
    const data = await getAPI(this.state.search, this.state.page);
    const allObjects = await Math.ceil(data.totalHits / 12);
    console.log(allObjects > this.state.page);
    console.log(data);
    this.setState({
      data: data.hits,
      allObjects: allObjects,
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

  buttonClick = async () => {
    this.setState((prev) => {
      return { page: prev.page + 1 };
    });
    console.log(this.state.page);
    const data = await getAPI(this.state.search, this.state.page + 1);
    await this.setState((prev) => {
      console.log("ne data");
      console.log(prev.data);
      console.log(this.state.page);
      return { data: [...prev.data, ...data.hits] };
    });
  };

  render() {
    return (
      <>
        <form onSubmit={this.handleSubmit}>
          <input type="text" onChange={this.handleChange} />
        </form>
        {this.state.isActive && <Modal />}
        <ul>
          {this.state.loading && (
            <Audio
              height="80"
              width="80"
              radius="9"
              color="blue"
              ariaLabel="loading"
              wrapperStyle
              wrapperClass
            />
          )}
          {/* {this.state.data && this.state.data.hits[0].previewURL} */}
          {this.state.data && <Render data={this.state.data} />}
          {this.state.data && this.state.allObjects > this.state.page && (
            <Button click={this.buttonClick} />
          )}
        </ul>
      </>
    );
  }
}

export default App;
