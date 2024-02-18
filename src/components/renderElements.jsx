import { Component } from "react";
import uniqid from "uniqid";

class Render extends Component {
  render() {
    return this.props.data.map((el) => (
      <li key={uniqid()} onClick={this.props.click}>
        <img src={el.webformatURL} alt={el.tags} />
      </li>
    ));
  }
}

export default Render;
