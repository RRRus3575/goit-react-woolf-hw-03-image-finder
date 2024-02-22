import { Component } from "react";

class Render extends Component {
  render() {
    return (
      <ul>
        {this.props.data.map((el) => (
          <li key={el.id} onClick={this.props.click}>
            <img src={el.webformatURL} srcSet={el.webformatURL} alt={el.tags} />
          </li>
        ))}
      </ul>
    );
  }
}

export default Render;
