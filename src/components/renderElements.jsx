import { Component } from "react";
import uniqid from "uniqid";

class Render extends Component {
  render() {
    return this.props.data.map((el) => (
      <li key={uniqid()}>
        <img src={el.webformatURL} alt={el.tags} />
      </li>
    ));
  }
}

export default Render;
