import React, { Component } from 'react';

import { __t } from '../../../i18n/translator';

class SelectPopup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: props.items,
    };
  }



  render() {
    const { closePopup, options } = this.props;

    return (
      <div className="popup-wrap" id="sendMessage" style={{ display: 'block' }}>
        <div
          className="popup mobile-search__popup"
        >
          <header className="mobile-search__header">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 14 14.031"
              className="popup-close icon"
              onClick={closePopup}
            >
              <path d="M14,1.414L12.59,0L7,5.602L1.41,0L0,1.414l5.589,5.602L0,12.618l1.41,1.413L7,8.428l5.59,5.604L14,12.618 L8.409,7.016L14,1.414z" />
            </svg>
            <div className="popup-title">
              {__t(options.title)}
            </div>
          </header>
          <div className="select-popup__input-wrap">
            <input
              className="select-popup__input"
              placeholder={__t('Search')}
              type="text"
            />
          </div>
        </div>
      </div>
    );
  }
}

export default SelectPopup;
