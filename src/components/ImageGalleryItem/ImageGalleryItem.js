import React, { Component } from "react";
import styles from "./ImageGalleryItem.module.css";

class ImageGalleryItem extends Component {
  handleClick = (event) => {
    const id = +event.currentTarget.id;
    this.props.onClick(id);
  };

  render() {
    const { id, src, alt } = this.props;
    return (
      <>
        <li
          id={id}
          className={styles.ImageGalleryItem}
          onClick={this.handleClick}
        >
          <img src={src} alt={alt} className={styles.ImageGalleryItem__image} />
        </li>
      </>
    );
  }
}

export default ImageGalleryItem;
