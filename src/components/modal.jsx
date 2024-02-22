import React, { Component } from "react";

class Modal extends Component {
  handleClickESC = (e) => {
    if (e.code === "Escape") {
      this.props.modalToggle();
    }
  };

  modalClose = (e) => {
    if (e.target.getAttribute("class") === "overlay") {
      this.props.modalToggle();
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
      <div className="overlay" onClick={this.modalClose}>
        <div className="modal">
          <img src={this.props.img} />
        </div>
      </div>
    );
  }
}
export default Modal;
