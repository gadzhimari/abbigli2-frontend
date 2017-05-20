import React, { Component, PropTypes } from 'react';

import Popup from '../CommonPopup';

import { __t } from '../../../i18n/translator';

class StatusPopup extends Component {
  render() {
    const { closePopup } = this.props;

    return (
      <Popup
        closePopup={closePopup}
        title={__t('Message have been successfully sent')}
      >
        <form className="popup-form">
          <div className="buttons-wrap">
            <button
              className="default-button"
              type="button"
              onClick={closePopup}
            >
              {__t('Cancel')}
            </button>
          </div>
        </form>
      </Popup>
    );
  }
}

StatusPopup.propTypes = {
  closePopup: PropTypes.func.isRequired,
};

export default StatusPopup;
