import React, { Component, PropTypes } from 'react';
import { __t } from './../../../i18n/translator';

const propTypes = {
  bannerId: PropTypes.number.isRequired,
  showLoginPopup: PropTypes.func.isRequired,
};

class Banner extends Component {
  componentDidUpdate() {
    const banner = document.querySelector('.faq-page__banner');
    banner.classList.add('flash-in');
  }

  render() {
    const { bannerId } = this.props;
    return (
      <div
        className={`faq-page__banner banner-${bannerId}`}
        id="banner"
        ref={banner => (this.banner = banner)}
      >
        <div className="faq-page__banner-text">
          <div>
              { __t('abigli.is.platform') }
          </div>
          <button
            className="legacy button-banner"
            type="button"
            onClick={this.props.showLoginPopup}
          >
              { __t('get.connect!') }
          </button>
        </div>
      </div>
    );
  }
}

Banner.propTypes = propTypes;

export default Banner;
