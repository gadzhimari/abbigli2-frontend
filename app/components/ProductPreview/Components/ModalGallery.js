import React, { Component, PropTypes } from 'react';

import Lightbox from 'react-images';

import { DOMAIN_URL } from 'config';

class ModalGallery extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeImage: Number(props.activeImage),
      width: 600,
    };
  }

  nextImage = () => this.setState({
    activeImage: this.state.activeImage + 1,
  });

  prevImage = () => this.setState({
    activeImage: this.state.activeImage - 1,
  });

  render() {
    const { closeGallery, isOpen } = this.props;
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
  images: PropTypes.array,
  activeImage: PropTypes.string.isRequired,
  closeGallery: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
};

export default ModalGallery;
