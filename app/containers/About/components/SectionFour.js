import React, { Component } from 'react';
import Slider from 'react-slick';

import { __t } from '../../../i18n/translator';

const sliderOption = {
  className: 'slider-about-four',
  dots: true,
  dotsClass: 'dots',
  arrows: false,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
};

class SectionFour extends Component {
  componentDidMount() {
    setTimeout(() => {
      this.forceUpdate();
    }, 200);
  }

  render() {
    return (
      <section id="about-section-4" className="about-section about-section-four">
        <Slider {...sliderOption}>
          <div>
            <div className="slide-container">
              <div className="about-slide__text">
                {__t('about.page.slider3.slide1')}
                </div>
              <div className="about-slide__images">
                <div className="about-slide__image pic-9"></div>
                <div className="about-slide__image pic-10"></div>
                <div className="about-slide__image pic-11"></div>
                <div className="about-slide__image pic-12"></div>
              </div>
            </div>
          </div>
          <div>
            <div className="slide-container">
              <div className="about-slide__bg bg-corner"></div>
              <div className="about-slide__text">
                {__t('about.page.slider3.slide2')}
                  </div>
              <div className="about-slide__images">
                <div className="about-slide__image pic-13"></div>
                <div className="about-slide__image pic-14"></div>
                <div className="about-slide__image pic-15"></div>
                <div className="about-slide__image pic-16"></div>
              </div>
            </div>
          </div>
          <div>
            <div className="slide-container">
              <div className="about-slide__bg bg-corner-white"></div>
              <div className="about-slide__text">
                {__t('about.page.slider3.slide3')}
                
                  </div>
              <div className="about-slide__images">
                <div className="about-slide__image pic-17"></div>
                <div className="about-slide__image pic-18"></div>
                <div className="about-slide__image pic-19"></div>
                <div className="about-slide__image pic-20"></div>
              </div>
            </div>
          </div>
          <div>
            <div className="slide-container">
              <div className="about-slide__text">
                {__t('about.page.slider3.slide4')}
                
                  </div>
              <div className="about-slide__images">
                <div className="about-slide__image pic-21"></div>
                <div className="about-slide__image pic-22"></div>
                <div className="about-slide__image pic-23"></div>
                <div className="about-slide__image pic-24"></div>
              </div>
            </div>
          </div>
          <div>
            <div className="slide-container">
              <div className="about-slide__bg bg-corner"></div>
              <div className="about-slide__text">
                {__t('about.page.slider3.slide5')}
                  </div>
              <div className="about-slide__images">
                <div className="about-slide__image pic-25"></div>
                <div className="about-slide__image pic-26"></div>
                <div className="about-slide__image pic-27"></div>
                <div className="about-slide__image pic-28"></div>
              </div>
            </div>
          </div>
          <div>
            <div className="slide-container">
              <div className="about-slide__bg bg-corner-white"></div>
              <div className="about-slide__text">
                {__t('about.page.slider3.slide6')}
              </div>
              <div className="about-slide__images">
                <div className="about-slide__image pic-29"></div>
                <div className="about-slide__image pic-30"></div>
                <div className="about-slide__image pic-31"></div>
                <div className="about-slide__image pic-32"></div>
              </div>
            </div>
          </div>
          <div>
            <div className="slide-container">
              <div className="about-slide__text">
                {__t('about.page.slider3.slide7')}
              </div>
              <div className="about-slide__images">
                <div className="about-slide__image pic-33"></div>
                <div className="about-slide__image pic-34"></div>
              </div>
            </div>
          </div>
        </Slider>
      </section>
    );
  }
}

export default SectionFour;
