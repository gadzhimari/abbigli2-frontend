import PropTypes from 'prop-types';
import React, { Component } from 'react';

import Lightbox from 'react-images';

class ModalGallery extends Component {
  state = {
    activeImage: Number(this.props.activeImage) || 0,
    width: 600,
  }

  nextImage = () => this.setState({
    activeImage: this.state.activeImage + 1,
  });

  prevImage = () => this.setState({
    activeImage: this.state.activeImage - 1,
  });

  render() {
    const { closeGallery, isOpen } = this.props;

    if (!isOpen) return null;

    const { activeImage } = this.state;
    const images = this.props.images
      .map(img => ({
        src: img.file,
      }));

    return (
      <Lightbox
        images={images}
        currentImage={activeImage}
        onClose={closeGallery}
        isOpen={isOpen}
        onClickNext={this.nextImage}
        onClickPrev={this.prevImage}
        src="file"
      />
    );
  }
}

ModalGallery.propTypes = {
  images: PropTypes.arrayOf(PropTypes.string),
  activeImage: PropTypes.string,
  closeGallery: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
};

export default ModalGallery;
