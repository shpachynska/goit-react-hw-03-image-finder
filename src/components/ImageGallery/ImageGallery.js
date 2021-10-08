import React, { Component } from "react";
import galleryAPI from "../../services/gallery-api";
import styles from "./ImageGallery.module.css";
import ImageGalleryItem from "../ImageGalleryItem/ImageGalleryItem";

export default class ImageGallery extends Component {
  state = {
    images: null,
    page: 1,
    status: "idle",
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.searchRequest !== this.props.searchRequest) {
      this.setState({ status: "pending" });
      fetch(
        `https://pixabay.com/api/?q=${this.props.searchRequest}&page=${this.state.page}&key=22998776-fe1d89aff15cc96b76b12cb7b&image_type=photo&orientation=horizontal&per_page=12`
      )
        .then((res) => res.json())
        .then((images) =>
          this.setState({ images: images.hits, status: "resolved" })
        );
    }
  }

  // getImages = () => {};

  render() {
    if (this.state.status === "idle") {
      return <div>What are you looking for?</div>;
    }

    if (this.state.status === "pending") {
      return <div>Loading...</div>;
    }

    if (this.state.status === "resolved") {
      return (
        <ul className={styles.ImageGallery}>
          {this.state.images.map((image) => (
            <ImageGalleryItem
              src={image.webformatURL}
              alt={image.tags}
              key={image.id}
              id={image.id}
              // onClick={this.formSubmitHandler}
            />
          ))}
        </ul>
      );
    }
  }
}

//   state = {
//     images: null,
//     page: 1,
//     id: null,
//     // showModal: false,
//     error: null,
//     status: "idle",
//     // showButton: false,
//     // loading: "false",
//   };

//   componentDidUpdate(prevProps, prevState) {
//     const { page } = this.state;
//     const searchRequest = this.props.searchRequest;

//     if (prevProps.searchRequest !== searchRequest) {
//       this.setState({
//         status: "pending",
//         // loading: true,
//         // images: null,
//         page: 1,
//       });
//       galleryAPI
//         .fetchImages(searchRequest, page)
//         .then((images) =>
//           this.setState({ images: [...images.data.hits], status: "resolved" })
//         )
//         .catch((error) => this.setState({ error, status: "rejected" }));
//     }
//   }

//   formSubmitHandler = (id) => {
//     this.setState({ id });
//   };

//   render() {
//     const { images, status, error } = this.state;
//     return (
//       <ul className={styles.ImageGallery}>
//         {images.map((image) => (
//           <ImageGalleryItem
//             searchRequest={this.props.searchRequest}
//             onClick={this.formSubmitHandler}
//             image={image}
//             id={image.id}
//           />
//         ))}
//       </ul>
//     );
//   }
// }
