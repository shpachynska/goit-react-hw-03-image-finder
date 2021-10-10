import React, { Component } from "react";
// import galleryAPI from "../../services/gallery-api";
import styles from "./ImageGallery.module.css";
import ImageGalleryItem from "../ImageGalleryItem/ImageGalleryItem";
import Modal from "../Modal/Modal";
import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import ErrorView from "../ErrorView/ErrorView";

export default class ImageGallery extends Component {
  state = {
    images: null,
    page: 1,
    status: "idle",
    error: null,
    showModal: false,
    id: null,
    loading: false,
  };

  componentDidUpdate(prevProps, prevState) {
    const { searchRequest } = this.props;
    const { page } = this.state;
    if (prevProps.searchRequest !== searchRequest) {
      this.setState({ status: "pending", page: 1, loading: true });
      fetch(
        `https://pixabay.com/api/?q=${searchRequest}&page=${page}&key=22998776-fe1d89aff15cc96b76b12cb7b&image_type=photo&orientation=horizontal&per_page=12`
      )
        .then((res) => res.json())
        .then((images) => {
          if (images.hits.length === 0) {
            this.setState({
              status: "rejected",
              loading: false,
              error: "There is no such images",
            });
          } else if (images.hits.length > 12) {
            this.setState({
              status: "resolved",
              images: images.hits,
              loading: false,
            });
          } else {
            this.setState({
              status: "resolved",
              images: images.hits,
              loading: false,
            });
          }
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
      return (
        <Loader
          type="Puff"
          color="#00BFFF"
          height={100}
          width={100}
          timeout={3000}
        />
      );
    }

    if (status === "rejected") {
      return <ErrorView />;
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
