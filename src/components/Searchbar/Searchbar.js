import { Component } from "react";
import { toast } from "react-toastify";
import styles from "./Searchbar.module.css";

export default class Searchbar extends Component {
  state = {
    searchRequest: "",
  };

  handleInputChange = (event) => {
    this.setState({ searchRequest: event.currentTarget.value.toLowerCase() });
  };

  handleSubmit = (event) => {
    event.preventDefault();

    if (this.state.searchRequest.trim() === "") {
      toast.error("What are you looking for?");
      return;
    }
    this.props.onSubmit(this.state.searchRequest);
    this.setState({ searchRequest: "" });
  };

  render() {
    return (
      <header className={styles.Searchbar}>
        <form className={styles.SearchForm} onSubmit={this.handleSubmit}>
          <button type="submit" className={styles.SearchForm__button}>
            <span className={styles.SearchForm__buttonLabel}>Search</span>
          </button>

          <input
            className={styles.SearchForm__input}
            type="text"
            autocomplete="off"
            autofocus
            placeholder="Search images and photos"
            onChange={this.handleInputChange}
          />
        </form>
      </header>
    );
  }
}
