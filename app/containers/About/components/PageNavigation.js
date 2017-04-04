import React from 'react';
import { Link } from 'react-scroll';

const PageNavigation = () => (
  <ul id="about-nav" className="about-page__controls">
    <li className="about-page__control">
      <Link
        activeClass="current"
        to="about-section-1"
        spy
        smooth
        offset={-80}
        duration={500}
      >
        <div className="control-button"></div>
      </Link>
    </li>
    <li className="about-page__control">
      <Link
        activeClass="current"
        to="about-section-2"
        spy
        smooth
        offset={0}
        duration={500}
      >
        <div className="control-button"></div>
      </Link>
    </li>
    <li className="about-page__control">
      <Link
        activeClass="current"
        to="about-section-3"
        spy
        smooth
        offset={0}
        duration={500}
      >
        <div className="control-button"></div>
      </Link>
    </li>
    <li className="about-page__control">
      <Link
        activeClass="current"
        to="about-section-4"
        spy
        smooth
        offset={0}
        duration={500}
      >
        <div className="control-button"></div>
      </Link>
    </li>
  </ul>
);

export default PageNavigation;
