import React, { Component } from 'react';

import BigPreview from './Components/BigPreview';
import SmallPreview from './Components/SmallPreview';
import SliderArrows from './Components/SliderArrows';
import ModalGallery from './Components/ModalGallery';

import './ProductPreview.styl';

class ProductPreview extends Component {
  constructor() {
    super();
    this.state = {
      activeIndex: '0',
      slideWidth: 460,
      thumbWidth: 107,
      modalOpen: false,
      thumbsScroll: 0,
    };
  }

  componentDidMount() {
    this.updateSliderSize();

    window.addEventListener('resize', this.updateSliderSize);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateSliderSize);
  }


  selectActive = ({ target }) => {
    const newActiveIndex = target.dataset.index;
    const activeElement = document.querySelector('.selected');
    const activeSmall = document.querySelector('.sp-selected-thumbnail');
    const nextElement = document.querySelector(`.sp-slide[data-index="${newActiveIndex}"]`);
    const nextSmall = document.querySelector(`.sp-thumbnail-container[data-index="${newActiveIndex}"]`);

    activeElement.classList.remove('selected');
    activeSmall.classList.remove('sp-selected-thumbnail');

    nextElement.classList.add('selected');
    nextSmall.classList.add('sp-selected-thumbnail');

    this.slideThumbs(newActiveIndex);

    this.setState({
      activeIndex: newActiveIndex,
    });
  }

  prevSlide = () => {
    const activeElement = document.querySelector('.selected');
    const activeSmall = document.querySelector('.sp-selected-thumbnail');

    const prevElement = activeElement.previousElementSibling
      ||
    document.querySelector('.sp-slides').lastElementChild;

    const prevSmall = activeSmall.previousElementSibling
      ||
    document.querySelector('.sp-thumbnails').lastElementChild;

    activeElement.classList.remove('selected');
    activeSmall.classList.remove('sp-selected-thumbnail');

    prevElement.classList.add('selected');
    prevSmall.classList.add('sp-selected-thumbnail');

    this.slideThumbs(prevElement.dataset.index);

    this.setState({
      activeIndex: prevElement.dataset.index,
    });
  }

  nextSlide = () => {
    const activeElement = document.querySelector('.selected');
    const activeSmall = document.querySelector('.sp-selected-thumbnail');

    const nextElement = activeElement.nextElementSibling
      ||
    document.querySelector('.sp-slides').firstElementChild;

    const nextSmall = activeSmall.nextElementSibling
      ||
    document.querySelector('.sp-thumbnails').firstElementChild;

    activeElement.classList.remove('selected');
    activeSmall.classList.remove('sp-selected-thumbnail');

    nextElement.classList.add('selected');
    nextSmall.classList.add('sp-selected-thumbnail');

    this.slideThumbs(nextElement.dataset.index);

    this.setState({
      activeIndex: nextElement.dataset.index,
    });
  }

  slideThumbs = (index) => {
    const { thumbWidth } = this.state;
    const { images } = this.props;
    const lastIndex = (images.length - 1).toString();
    let numberIndex;

    if (index === '0') {
      numberIndex = 1;
    } else if (index === lastIndex) {
      numberIndex = lastIndex - 1;
    } else {
      numberIndex = Number(index);
    }

    const newScroll = (thumbWidth + 10) * (numberIndex - 1);

    this.setState({
      thumbsScroll: newScroll,
    });
  }

  openGallery = () => {
    document.body.style.overflow = 'hidden';

    this.setState({
      modalOpen: true,
    });
  }

  closeGallery = () => {
    document.body.style = {};
    this.setState({
      modalOpen: false,
    });
  }

  updateSliderSize = () => {
    const newWidth = document.querySelector('.product-slider').offsetWidth;

    this.setState({
      slideWidth: newWidth,
      thumbWidth: (newWidth / 3) - 7,
    });
  }

  render() {
    const {
      slideWidth,
      activeIndex,
      modalOpen,
      thumbWidth,
      thumbsScroll,
    } = this.state;
    const { images } = this.props;
    const thumbsWidth = (((slideWidth / 3) + 5) * images.length);

    return (
      <div className="product-preview">
        {
          modalOpen
            &&
          <ModalGallery
            images={images}
            activeImage={activeIndex}
            closeGallery={this.closeGallery}
            isOpen={modalOpen}
          />
        }
        <div
          id="my-slider"
          className="product-slider"
        >
          <div
            className="sp-full-screen-button sp-fade-full-screen"
            style={{ zIndex: 100 }}
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
          <div
            className="slides-container"
            style={{
              width: `${slideWidth}px`,
              height: `${slideWidth}px`,
            }}
          >
            <div
              className="sp-slides"
              ref={container => (this.slidesContainer = container)}
              onClick={this.openGallery}
            >
              {
                images.map((item, index) => <BigPreview
                  key={`${item.id.toString()}--big`}
                  src={item.file}
                  active={index.toString() === activeIndex}
                  index={index}
                />)
              }
            </div>
            {
              images.length > 1
                &&
              <SliderArrows
                prevSlide={this.prevSlide}
                nextSlide={this.nextSlide}
              />
            }
          </div>
          {
            images.length > 1
            &&
            <div className="thumbnails-container">
              <div
                className="sp-thumbnails sp-grab"
                ref={container => (this.thumbsContainer = container)}
                style={{
                  width: `${thumbsWidth}px`,
                  WebkitTransform: `translate3d(-${thumbsScroll}px, 0 , 0)`,
                  transform: `translate3d(-${thumbsScroll}px, 0 , 0)`,
                }}
              >
                {
                  images.map((item, index) => <SmallPreview
                    src={item.file}
                    key={`${item.id.toString()}--small`}
                    active={index.toString() === activeIndex}
                    index={index}
                    slideWidth={thumbWidth}
                    onClick={this.selectActive}
                  />)
                }
              </div>
            </div>
          }
        </div>
      </div>
    );
  }
}

export default ProductPreview;
