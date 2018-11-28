import React, { Component } from "react";
import ApiUrl from "../../helpers/environment";

export default class HelloWorld extends Component {
  state = {
    text: ""
  };

  componentDidMount() {
    fetch(`${ApiUrl}/hello_world/`)
      .then(response => response.json())
      .then(text => this.setState({ text }));
  }

  render() {
      return (
        <div>
            {this.state.text}
        </div>
      )
  }
}
