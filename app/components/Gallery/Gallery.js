import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import ImageGallery from 'react-image-gallery';
import 'react-image-gallery/styles/css/image-gallery.css';
import './Gallery.less';

class Gallery extends PureComponent {
  render() {
    console.log('images ', this.props.images);
    const shouldShowDots = this.props.images.length > 1;
    return (<ImageGallery
      items={this.props.images}
      showThumbnails={false}
      showFullscreenButton={false}
      showPlayButton={false}
      showBullets={shouldShowDots}
      slideInterval={2000}
    />);
  }
}

Gallery.propTypes = {
  images: PropTypes.any.isRequired,
};

export default Gallery;
