import PropTypes from 'prop-types';
import React, { Component } from 'react';

import { __t } from '../../../i18n/translator';

class StatusPopup extends Component {
  static propTypes = {
    closePopup: PropTypes.func.isRequired,
    options: PropTypes.shape({
      title: PropTypes.string,
    }).isRequired,
  }

  render() {
    const { closePopup, options } = this.props;

    return (
      <div className="popup-wrap" id="sendMessage" style={{ display: 'block' }}>
        <div className="popup mobile-search__popup reset-popup">
          <form className="register-popup__form">
            <div className="register-popup__content">
              {options.title}
            </div>
            <button
              className="register-popup__fetch-button"
              type="button"
              onClick={closePopup}
            >
              {__t('Ok')}
            </button>
          </form>
        </div>
      </div>
    );
  }
}


export default StatusPopup;
