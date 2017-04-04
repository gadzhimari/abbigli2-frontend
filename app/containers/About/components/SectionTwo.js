import React, { Component } from 'react';
import Slider from 'react-slick';

import { __t } from '../../../i18n/translator';

const sliderOption = {
  className: 'slider-about-two',
  dots: true,
  dotsClass: 'dots',
  arrows: false,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
};

class SectionTwo extends Component {
  componentDidMount() {
    setTimeout(() => {
      this.forceUpdate();
    }, 200);
  }

  render() {
    return (
      <section id="about-section-2" className="about-section">
          <Slider {...sliderOption}>
            <div className="about-slide">
              <div className="slide-container">
              <div className="about-slide__text">
                {__t('about.page.slider1.slide1')}
              </div>
              <div className="about-slide__images">
                <div className="about-slide__image pic-1"></div>
                <div className="about-slide__image pic-2"></div>
                <div className="about-slide__image pic-3"></div>
                <div className="about-slide__image pic-4"></div>
              </div>
            </div>
            </div>
            <div className="about-slide">
              <div className="slide-container">
              <div className="about-slide__text">
                {__t('about.page.slider1.slide2')}
              </div>
              <div className="about-slide__images">
                <div className="about-slide__image pic-5"></div>
                <div className="about-slide__image pic-6"></div>
                <div className="about-slide__image pic-7"></div>
                <div className="about-slide__image pic-8"></div>
              </div>
              </div>
            </div>
          </Slider>
      </section>
    );
  }
}

export default SectionTwo;
