import React, { PropTypes } from 'react';

import Popup from '../CommonPopup';

import { __t } from '../../../i18n/translator';

const StatusPopup = ({
  closePopup,
  options,
}) => (
  <Popup
    closePopup={closePopup}
    title={__t(options.title)}
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

StatusPopup.propTypes = {
  closePopup: PropTypes.func.isRequired,
  options: PropTypes.shape({
    title: PropTypes.string,
  }).isRequired,
};

export default StatusPopup;
