import "./App.css";
import { Component } from "react";
import imageGallery from "./components/ImageGallery/ImageGallery";
import Searchbar from "./components/Searchbar/Searchbar";

export default class App extends Component {
  state = {
    searchRequest: "",
  };

  handleInputSubmit = (searchRequest) => {
    this.setState({ searchRequest: searchRequest });
  };

  render() {
    return <Searchbar onSubmit={this.handleInputSubmit} />;
  }
}
