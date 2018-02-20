import PropTypes from 'prop-types';
import React, { Component } from 'react';

import Lightbox from 'react-images';

class ModalGallery extends Component {
  state = {
    currentImage: this.props.currentImage || 0,
    width: 600,
  }

  componentWillReceiveProps(nextProps) {
    const { isOpen } = this.props;

    if (!isOpen) {
      this.setState({
        currentImage: nextProps.currentImage,
      });
    }
  }

  onClose = () => {
    const { currentImage, closeGallery } = this.props;

    this.setState({
      currentImage,
    });
    closeGallery(this.state.currentImage);
  }

  nextImage = () => this.setState({
    currentImage: this.state.currentImage + 1,
  });

  prevImage = () => this.setState({
    currentImage: this.state.currentImage - 1,
  });

  render() {
    const { isOpen } = this.props;

    if (!isOpen) {
      return null;
    }

    const { currentImage } = this.state;
    const images = this.props.images.map(img => ({
      src: img.file,
    }));

    return (
      <Lightbox
        images={images}
        currentImage={currentImage}
        onClose={this.onClose}
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
  currentImage: PropTypes.number,
  closeGallery: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
};

export default ModalGallery;
