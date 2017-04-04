import React, { PropTypes, Component } from 'react';
import ImageGallery from 'react-image-gallery';
import "react-image-gallery/styles/css/image-gallery.css";
import "./GalleryProduct.styl";

class GalleryProduct extends Component {
  render() {
    return <ImageGallery
              items={this.props.images}
              showThumbnails={true}
              showFullscreenButton={true}
              showPlayButton={false}
              showBullets={ false }
              slideInterval={2000}/>;
  }
}

GalleryProduct.propTypes = {
  images: PropTypes.any.isRequired
};

export default GalleryProduct;
