import React, { Component, PropTypes } from 'react';

class ModalGallery extends Component {
  constructor() {
    super();
    this.state = {
      activeImage: null,
      width: 600,
    };
  }

  componentDidMount() {
    this.updateModalSize();
  }


  nextImage = () => {
    const activeImage = document.querySelector('.modal-gallery__image--active');
    const nextImage = activeImage.nextElementSibling
      ||
      this.imagesContainer.firstElementChild;

    activeImage.classList.remove('modal-gallery__image--active');
    nextImage.classList.add('modal-gallery__image--active');

    this.updateModalSize();
  }

  prevImage = () => {
    const activeImage = document.querySelector('.modal-gallery__image--active');
    const prevImage = activeImage.previousElementSibling
      ||
      this.imagesContainer.lastElementChild;

    activeImage.classList.remove('modal-gallery__image--active');
    prevImage.classList.add('modal-gallery__image--active');

    this.updateModalSize();
  }

  closeGallery = ({ target }) => {
    const { closeGallery } = this.props;

    if (
      target.classList.contains('modal-gallery__overlay')
      ||
      target.classList.contains('modal-gallery__close')
    ) {
      closeGallery();
    }
  }

  updateModalSize = () => {
    const activeImageWidth = document
      .querySelector('.modal-gallery__image--active')
      .naturalWidth;
    const windowWidth = window.innerWidth;

    if (activeImageWidth > (windowWidth - 20)) {
      this.setState({
        width: windowWidth - 20,
      });
    } else {
      this.setState({
        width: activeImageWidth,
      });
    }
  }

  render() {
    const { width } = this.state;
    const { images, activeImage } = this.props;

    return (
      <div
        className="modal-gallery__overlay"
        onClick={this.closeGallery}
      >
        <div
          className="modal-gallery"
          style={{ width: `${width}px` }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 14 14.031"
            className="modal-gallery__close"
          >
            <path d="M14,1.414L12.59,0L7,5.602L1.41,0L0,1.414l5.589,5.602L0,12.618l1.41,1.413L7,8.428l5.59,5.604L14,12.618 L8.409,7.016L14,1.414z" />
          </svg>
          <div
            ref={container => (this.imagesContainer = container)}
          >
            {
              images.map((image, index) => <img
                src={image.file}
                key={image.id}
                onLoad={this.updateModalSize}
                className={
                  `modal-gallery__image${index == activeImage ? ' modal-gallery__image--active' : ''}`
                }
              />)
            }
          </div>
          {
            images.length > 1
            &&
            <div>
              <div
                className="modal-gallery__arrow modal-gallery__arrow--prev"
                onClick={this.prevImage}
              >
                <svg className="icon" >
                  <use xmlnsXlink="http://www.w3.org/1999/xlink" xlinkHref="#prev"></use>
                </svg>
              </div>
              <div
                className="modal-gallery__arrow modal-gallery__arrow--next"
                onClick={this.nextImage}
              >
                <svg className="icon" >
                  <use xmlnsXlink="http://www.w3.org/1999/xlink" xlinkHref="#next"></use>
                </svg>
              </div>
            </div>
          }
        </div>
      </div>
    );
  }
}

ModalGallery.propTypes = {
  images: PropTypes.array,
  activeImage: PropTypes.string,
  closeGallery: PropTypes.func,
};

export default ModalGallery;
