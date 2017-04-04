import React, { Component } from 'react';
import Slider from 'react-slick';

import { __t } from '../../../i18n/translator';

const leftArrow = (
  <span className="slides-navigation__item prev">
    <svg className="icon" >
      <use xmlnsXlink="http://www.w3.org/1999/xlink" xlinkHref="#prev"></use>
    </svg>
  </span>
);

const rightArrow = (
  <span className="slides-navigation__item next">
    <svg className="icon" >
      <use xmlnsXlink="http://www.w3.org/1999/xlink" xlinkHref="#next"></use>
    </svg>
  </span>
);

const sliderOption = {
  className: 'slider-about-three',
  dots: false,
  arrows: true,
  nextArrow: rightArrow,
  prevArrow: leftArrow,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
};

class SectionThree extends Component {
  componentDidMount() {
    setTimeout(() => {
      this.forceUpdate();
    }, 200);
  }

  render() {
    return (
      <section id="about-section-3" className="about-section about-section-three">
        <Slider {...sliderOption}>
          <div>
            <div className="slide-container">
              <img className="about-slide__img" src="/images/about/slide-1.jpg" alt="" />
              <div className="slide-content">
                <div className="about-page__logo" />
                <ul className="about-advantages">
                  <li className="about-advantage">
                    {__t('about.page.slider2.slide1.header')}
                  </li>
                  <li className="about-advantage">
                    {__t('about.page.slider2.slide1.p1')}
                  </li>
                  <li className="about-advantage">
                    {__t('about.page.slider2.slide1.p2')}
                  </li>
                  <li className="about-advantage">
                    {__t('about.page.slider2.slide1.p3')}
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div>
            <div className="slide-container">
              <img className="about-slide__img" src="/images/about/slide-2.jpg" alt="" />
              <div className="slide-content">
                <div className="about-page__logo" />
                <ul className="about-advantages">
                  <li className="about-advantage">
                    {__t('about.page.slider2.slide2.header')}
                  </li>
                  <li className="about-advantage">
                    {__t('about.page.slider2.slide2.p1')}
                  </li>
                  <li className="about-advantage">
                    {__t('about.page.slider2.slide2.p2')}
                  </li>
                  <li className="about-advantage">
                    {__t('about.page.slider2.slide2.p3')}
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </Slider>
      </section>
    );
  }
}

export default SectionThree;
