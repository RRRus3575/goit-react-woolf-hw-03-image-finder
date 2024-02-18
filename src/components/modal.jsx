import React, { Component } from "react";

class Modal extends Component {
  handleClickESC = (e) => {
    if (e.code === "Escape") {
      console.log("Escape!!");
      this.props.handleClickESC();
    }
  };

  componentDidMount() {
    document.addEventListener("keydown", this.handleClickESC);
  }

  componentWillUnmount() {
    document.removeEventListener("keydown", this.handleClickESC);
  }

  render() {
    return (
      <div className="overlay" onClick={this.props.click}>
        <div className="modal">
          <img src={this.props.img.largeImageURL} />
        </div>
      </div>
    );
  }
}
export default Modal;
