import { Component } from "react";

class Render extends Component {
  render() {
    return this.props.data.hits.map((el) => (
      <li key={el.id}>
        <img src={el.webformatURL} alt={el.tags} />
      </li>
    ));
  }
}

export default Render;
