import React from 'react';
import PropTypes from 'prop-types';

import { pure } from 'recompose';
import { __t } from '../../../i18n/translator';

const CitySelect = ({ openCityPopup, value, className }) => (
  <div className={`select ${className}`}>
    <input
      className="input"
      type="text"
      placeholder={__t('Place of event')}
      onFocus={openCityPopup}
      value={value}
    />
    <svg className="icon icon-arrow" viewBox="0 0 11.3 19.6">
      <path d="M0.7,0.6c-0.8,0.8-0.9,2.1-0.1,2.9l5.9,6.4l-5.9,6.3c-0.8,0.9-0.8,2.2,0.1,2.9 c0.9,0.7,2.1,0.7,2.9-0.1l7.2-7.8c0.1-0.1,0.1-0.1,0.2-0.2l0,0c0.1-0.1,0.1-0.2,0.2-0.3l0,0c0-0.1,0.1-0.2,0.1-0.3v-0.1 c0-0.1,0-0.2,0-0.2c0-0.1,0-0.1,0-0.2c0-0.1,0-0.1,0-0.2c0-0.1,0-0.2,0-0.2V9.4c0-0.1-0.1-0.2-0.1-0.3l0,0C11.1,9,11.1,8.9,11,8.8 l0,0c-0.1-0.1-0.1-0.2-0.2-0.2L3.6,0.7C2.8-0.2,1.5-0.2,0.7,0.6z" />
    </svg>
  </div>
);

CitySelect.defaultProps = {
  value: '',
  className: 'select_place',
};

CitySelect.propTypes = {
  openCityPopup: PropTypes.func.isRequired,
  value: PropTypes.string,
  className: PropTypes.string,
};

export default pure(CitySelect);
