import Helmet from 'react-helmet';
import React, { Component, PropTypes } from 'react';
import { connect } from 'preact-redux';
import { bindActionCreators } from 'redux';

import { loginPopup } from 'ducks/Popup';

import Banner from './components/Banner';
import FaqTabs from './components/FaqTabs';

import './Faq.styl';

const propTypes = {
  loginPopup: PropTypes.func.isRequired,
};

class Faq extends Component {
  constructor() {
    super();
    this.state = {
      activeBanner: 1,
    };
  }

  componentDidMount() {
    const banner = document.querySelector('.faq-page__banner');
    banner.addEventListener('animationend', e => {
      if (e.animationName === 'flashIn') {
        banner.classList.remove('flash-in');
      } else {
        banner.classList.remove('flash-out');
        this.changeActiveBanner();
      }
    });

    banner.classList.add('flash-in');
  }

  changeActiveBanner = () => {
    let { activeBanner } = this.state;

    if (activeBanner === 4) {
      activeBanner = 0;
    }

    this.setState({
      activeBanner: ++activeBanner,
    });
  }

  doChangeActiveBanner = () => {
    const banner = document.querySelector('.faq-page__banner');

    banner.classList.add('flash-out');
  }

  render() {
    const { activeBanner } = this.state;
    const { loginPopup } = this.props;

    return (
      <div className="container-fluid faq-page" id="page-container">
        <Banner
          bannerId={activeBanner}
          showLoginPopup={loginPopup}
        />
        <FaqTabs func={this.doChangeActiveBanner} />
      </div>
    );
  }
}

Faq.propTypes = propTypes;

const mapDispatchToProps = dispatch => ({
  loginPopup: bindActionCreators(loginPopup, dispatch),
});

export default connect(null, mapDispatchToProps)(Faq);