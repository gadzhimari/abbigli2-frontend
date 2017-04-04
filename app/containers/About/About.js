import React, { Component } from 'react';

import PageNavigation from './components/PageNavigation';
import SectionTwo from './components/SectionTwo';
import SectionFour from './components/SectionFour';
import SectionThree from './components/SectionThree';

import './About.styl';

class About extends Component {
  render() {
    return (
      <div className="container-fluid about-page" id="page-container">
        <PageNavigation />

        <section id="about-section-1" className="about-page__cover">
          <div className="about-page__logo"></div>
        </section>

        <SectionTwo />

        <SectionThree />

        <SectionFour />
      </div>
    );
  }
}

export default About;
