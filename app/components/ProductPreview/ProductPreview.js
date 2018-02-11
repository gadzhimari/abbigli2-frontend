import React, { Component } from 'react';
import ImageGallery from 'react-image-gallery';
import 'react-image-gallery/styles/css/image-gallery.css';

import ModalGallery from './Components/ModalGallery';

import './ProductPreview.less';

class ProductPreview extends Component {
  state = {
    currentIndex: 0,
    modalOpen: false,
  }

  onSlide = (index) => {
    this.setState({
      currentIndex: index,
    });
  }

  openGallery = () => {
    this.setState({
      modalOpen: true,
    });
  }

  closeGallery = (index) => {
    this.setState({
      modalOpen: false,
      currentIndex: index,
    });
    this.imageGallery.slideToIndex(index);
  }

  renderLeftNav(onClick) {
    return (
      <button
        className="image-gallery-left-nav"
        onClick={onClick}
      >
        <svg className="icon" viewBox="0 0 11.56 18.72">
          <path d="M9.36,0l2.199,2.2L4.415,9.36l7.145,7.16L9.36,18.72L0,9.36L9.36,0z" />
        </svg>
      </button>
    );
  }

  renderRightNav(onClick) {
    return (
      <button
        className="image-gallery-right-nav"
        onClick={onClick}
      >
        <svg className="icon" viewBox="0 0 11.56 18.72">
          <path d="M2.2,0L0,2.2l7.146,7.16L0,16.521l2.2,2.199L11.56,9.36L2.2,0z" />
        </svg>
      </button>
    );
  }

  render() {
    const { images, tags, title } = this.props;

    if (images.length === 0) return null;

    const { currentIndex, modalOpen } = this.state;
    const defaultImages = images.map(image => ({
      original: image.file,
      thumbnail: image.file,
      originalAlt: tags.join(' '),
      originalTitle: title,
    }));
    const shouldShowImages = images.length > 1;

    return (
      <div className="product__gallery">
        <ModalGallery
          images={images}
          currentImage={currentIndex}
          closeGallery={this.closeGallery}
          isOpen={modalOpen}
        />
        <div
          className="image-gallery-button-expand"
          onClick={this.openGallery}
        >
          <svg
            className="icon"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 28 28"
          >
            <path d="M4,18H0v10h10v-4H4V18z M0,10h4V4h6V0H0V10z M24,24h-6v4h10V18h-4V24z M18,0v4h6v6h4V0H18z" />
          </svg>
        </div>
        <ImageGallery
          ref={(i) => { this.imageGallery = i; }}
          items={defaultImages}
          showThumbnails={shouldShowImages}
          showFullscreenButton={false}
          showPlayButton={false}
          showBullets={false}
          slideInterval={2000}
          onSlide={this.onSlide}
          renderLeftNav={this.renderLeftNav}
          renderRightNav={this.renderRightNav}
        />
      </div>
    );
  }
}

export default ProductPreview;
