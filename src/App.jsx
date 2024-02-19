import { useState } from "react";
import React, { Component } from "react";
import { Audio } from "react-loader-spinner";
import "./App.css";
import Button from "./components/Button";
import getAPI from "./components/API";
import Render from "./components/renderElements";
import Modal from "./components/modal";
import Form from "./components/Form";

export class App extends Component {
  state = {
    data: null,
    search: "",
    loading: false,
    isActive: false,
    page: 1,
    allObjects: 1,
    currentItem: "",
    isResult: false,
  };

  async componentDidUpdate(_, prevState) {
    if (prevState.search !== this.state.search) {
      try {
        this.setState({
          loading: true,
        });

        const data = await getAPI(this.state.search, this.state.page);
        const allObjects = await Math.ceil(data.totalHits / 12);
        if (data.total < 1) {
          return this.setState({
            isResult: true,
          });
        }
        this.setState({
          data: data.hits,
          isResult: false,
          allObjects: allObjects,
        });
      } catch (error) {
        console.log("error");
      } finally {
        this.setState({
          loading: false,
        });
      }
    }
    if (prevState.page !== this.state.page) {
      try {
        const data = await getAPI(this.state.search, this.state.page);
        await this.setState((prev) => {
          return { data: [...prev.data, ...data.hits], loading: false };
        });
      } catch (error) {
        console.log("error");
      }
    }
  }

  submitForm = (text) => {
    this.setState({
      search: text,
      data: null,
      page: 1,
      allObjects: 1,
    });
  };

  buttonClick = async () => {
    this.setState((prev) => {
      return { page: prev.page + 1, loading: true };
    });
  };

  itemClick = (e) => {
    let item = e.target.getAttribute("src");
    let currentItem = this.state.data.find((el) => el.webformatURL === item);
    this.setState({
      currentItem,
      isActive: true,
    });
  };

  modalToggle = () => {
    this.setState((prev) => {
      return { isActive: !prev.isActive };
    });
  };

  render() {
    return (
      <div className="container">
        <Form submitForm={this.submitForm} />

        {this.state.isActive && (
          <Modal img={this.state.currentItem} modalToggle={this.modalToggle} />
        )}
        <ul>
          {this.state.isResult && (
            <p className="notification">
              Nothing was found for this query, please try entering a different
              value😞
            </p>
          )}
          {this.state.data && (
            <Render data={this.state.data} click={this.itemClick} />
          )}
        </ul>
        {this.state.data && this.state.allObjects > this.state.page && (
          <Button click={this.buttonClick} />
        )}
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
      </div>
    );
  }
}

export default App;
