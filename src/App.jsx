import React, { Component } from "react";

import "./App.css";
import Button from "./components/Button";
import getAPI from "./components/API";
import Render from "./components/renderElements";
import Modal from "./components/modal";
import Form from "./components/Form";
import Loader from "./components/Loader";

export class App extends Component {
  state = {
    data: null,
    search: "",
    loading: false,
    isActive: false,
    page: 1,
    totalPages: 1,
    imgLarge: "",
    isEmpty: false,
  };

  async componentDidUpdate(_, prevState) {
    if (
      prevState.search !== this.state.search ||
      prevState.page !== this.state.page
    ) {
      try {
        this.setState({
          loading: true,
        });

        const data = await getAPI(this.state.search, this.state.page);

        if (prevState.search === this.state.search) {
          this.setState({
            data: [...prevState.data, ...data.hits],
            loading: false,
          });
        } else {
          data.hits.length < 1
            ? this.setState({
                isEmpty: true,
              })
            : this.setState({
                data: data.hits,
                isEmpty: false,
                totalPages: Math.ceil(data.totalHits / 12),
              });
        }
      } catch (error) {
        console.log("error");
      } finally {
        this.setState({
          loading: false,
        });
      }
    }
  }

  submitForm = (text) => {
    this.setState({
      search: text,
      data: null,
      page: 1,
      totalPages: 1,
    });
  };

  buttonClick = async () => {
    this.setState((prev) => {
      return { page: prev.page + 1, loading: true };
    });
  };

  itemClick = (e) => {
    this.setState({
      imgLarge: e.target.getAttribute("srcSet"),
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
          <Modal img={this.state.imgLarge} modalToggle={this.modalToggle} />
        )}

        {this.state.isEmpty && (
          <p className="notification">
            Nothing was found for this query, please try entering a different
            value😞
          </p>
        )}
        {this.state.data && (
          <Render data={this.state.data} click={this.itemClick} />
        )}
        {this.state.loading && <Loader />}
        {this.state.data && this.state.totalPages > this.state.page && (
          <Button click={this.buttonClick} />
        )}
      </div>
    );
  }
}

export default App;
