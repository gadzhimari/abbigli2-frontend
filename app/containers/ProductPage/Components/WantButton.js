import React, { PropTypes } from 'react';
import { FetchingButton } from 'components';

import { __t } from '../../../i18n/translator';

const WantButton = (props) => {
  const { showWants, showWantsPopup, onChange, onSend, isSending } = props;

  return (<div>
    {
      !showWants
        ? <a
          className="tooltip-wrap want-button"
          data-title={__t('You can send a private message to the author of this publication and arrange the purchase details!')}
          onClick={() => showWantsPopup(true)}
        >
          <svg className="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 44 37.96">
            <path d="M32.42,13.96L23.66,0.84C23.281,0.28,22.639,0,22,0c-0.64,0-1.28,0.28-1.661,0.86l-8.76,13.1H2 c-1.1,0-2,0.9-2,2c0,0.18,0.02,0.36,0.08,0.54L5.16,35.04c0.46,1.68,2,2.92,3.84,2.92h26c1.84,0,3.379-1.24,3.859-2.92l5.082-18.54 L44,15.96c0-1.1-0.9-2-2-2H32.42z M16,13.96l6-8.8l6,8.8H16z M22,29.96c-2.2,0-4-1.801-4-4s1.8-4,4-4c2.199,0,4,1.801,4,4 S24.199,29.96,22,29.96z" />
          </svg>
          {__t('Want it')}
      </a>
      : (<div className="want-textarea">
        <div className="textarea-wrap">
          <textarea
            name="contenter"
            id="contenter"
            className="textarea"
            placeholder={__t('Your message to the member who published this product/service')}
            onChange={onChange}
          />
        </div>
        <div className="buttons-wrap">
          <FetchingButton
            className="default-button"
            onClick={onSend}
            isFetching={isSending}
          >
            {__t('Send')}
          </FetchingButton>
          <button
            className="default-button"
            type="button"
            onClick={() => showWantsPopup(false)}
          >
            {__t('Cancel')}
          </button>
        </div>
      </div>)
    }
  </div>);
};

WantButton.propTypes = {
  showWants: PropTypes.bool.isRequired,
  showWantsPopup: PropTypes.func.isRequired,
  onSend: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default WantButton;
