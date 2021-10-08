import React, { Component } from "react";
import styles from "./ImageGalleryItem.module.css";

class ImageGalleryItem extends Component {
  // handleClick = (event) => {
  //   const id = event.currentTarget.id;
  //   this.props.onClick(id);
  // };

  render() {
    // const { images } = this.props;
    return (
      <li
        id={this.props.id}
        className={styles.ImageGalleryItem}
        // onClick={this.handleClick}
      >
        <img
          src={this.props.src}
          alt={this.props.alt}
          className={styles.ImageGalleryItem__image}
        />
      </li>
    );
  }
}

export default ImageGalleryItem;
