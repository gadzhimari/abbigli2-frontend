import React, { Component } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';

import { __t } from '../../../i18n/translator';

const leftArrow = (
  <span className="slides-navigation__item prev">
    <svg className="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
      <path
        d="M7.66,8.001l5.202-5.357c0.191-0.197,0.191-0.518,0-0.715l-1.734-1.786 c-0.191-0.197-0.502-0.197-0.693,0L4.886,5.858c0,0-0.001,0-0.001,0L3.151,7.644c-0.191,0.197-0.191,0.518,0,0.715l1.733,1.786
        c0,0,0,0,0.001,0.001l5.548,5.714c0.191,0.197,0.502,0.197,0.693,0l1.734-1.785c0.191-0.197,0.191-0.518,0-0.715L7.66,8.001z"
      />
    </svg>
  </span>
);

const rightArrow = (
  <span className="slides-navigation__item next">
    <svg className="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
      <path
        d="M12.861,7.645l-7.282-7.5c-0.191-0.197-0.502-0.197-0.693,0L3.151,1.93 c-0.191,0.197-0.191,0.518,0,0.715l5.202,5.357l-5.202,5.357c-0.191,0.197-0.191,0.518,0,0.715l1.734,1.786
        c0.191,0.197,0.502,0.197,0.693,0l5.548-5.714c0-0.001,0.001-0.001,0.001-0.001l1.733-1.786 C13.053,8.163,13.053,7.842,12.861,7.645z"
      />
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
