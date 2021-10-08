import React, { Component } from "react";
// import galleryAPI from "../../services/gallery-api";
import styles from "./ImageGallery.module.css";
import ImageGalleryItem from "../ImageGalleryItem/ImageGalleryItem";
import Modal from "../Modal/Modal";

export default class ImageGallery extends Component {
  state = {
    images: null,
    page: 1,
    status: "idle",
    error: null,
    showModal: false,
    id: null,
  };

  componentDidUpdate(prevProps, prevState) {
    const { searchRequest } = this.props;
    const { page } = this.state;
    if (prevProps.searchRequest !== searchRequest) {
      this.setState({ status: "pending" });
      fetch(
        `https://pixabay.com/api/?q=${searchRequest}&page=${page}&key=22998776-fe1d89aff15cc96b76b12cb7b&image_type=photo&orientation=horizontal&per_page=12`
      )
        .then((res) => res.json())
        .then((images) => {
          this.setState({ images: images.hits, status: "resolved" });
        })
        .catch((error) => this.setState({ error, status: "rejected" }));
    }
  }

  imgClickHandler = (id) => {
    this.setState({ id: id });
    this.toggleModal();
    console.log(`You clicked image no. ${id}`);
  };

  toggleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };

  getImgById = () => {
    const { images, id } = this.state;
    if (images !== null) {
      return images.find((image) => image.id === id);
    }
  };

  render() {
    const { status, images, showModal } = this.state;
    const imgInfo = this.getImgById();

    if (status === "idle") {
      return <div>What are you looking for?</div>;
    }

    if (status === "pending") {
      return <div>Loading...</div>;
    }

    if (status === "rejected") {
      return alert("nothing found");
    }

    if (status === "resolved") {
      return (
        <div>
          <ul className={styles.ImageGallery}>
            {images.map((image) => (
              <ImageGalleryItem
                src={image.webformatURL}
                alt={image.tags}
                key={image.id}
                id={image.id}
                onClick={this.imgClickHandler}
              />
            ))}
          </ul>
          {showModal && (
            <Modal
              onClose={this.toggleModal}
              src={imgInfo.largeImageURL}
              alt={imgInfo.tags}
            />
          )}
        </div>
      );
    }
  }
}
