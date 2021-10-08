import "./App.css";
import React, { Component } from "react";
import ImageGallery from "./components/ImageGallery/ImageGallery";
import Searchbar from "./components/Searchbar/Searchbar";

export default class App extends Component {
  state = {
    searchRequest: "",
  };

  handleInputSubmit = (userInput) => {
    this.setState({ searchRequest: userInput });
  };

  render() {
    return (
      <div>
        <Searchbar onSubmit={this.handleInputSubmit} />
        <ImageGallery searchRequest={this.state.searchRequest} />
      </div>
    );
  }
}
