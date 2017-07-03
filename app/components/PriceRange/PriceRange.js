import React from 'react';
import PropTypes from 'prop-types';

import { __t } from '../../i18n/translator';
import './PriceRange.less';

const PriceRange = ({
  disabled,
  onChange,
  priceTo,
  priceFrom,
}) => (
    <div className="price-range">
      <div className="price-range__from">
        <label className="label" htmlFor="priceFrom">
          {__t('Price from')}
        </label>
        <input
          id="priceFrom"
          className="input"
          type="tel"
          disabled={disabled}
          onChange={onChange}
          data-field="priceFrom"
          value={priceFrom}
        />
      </div>
      <div className="price-range__to">
        <label className="label" htmlFor="priceTo">
          {__t('to')}
        </label>
        <input
          id="priceTo"
          className="input"
          type="tel"
          disabled={disabled}
          onChange={onChange}
          data-field="priceTo"
          value={priceTo}
        />
      </div>
    </div>
  );

PriceRange.propTypes = {
  disabled: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
  priceTo: PropTypes.string.isRequired,
  priceFrom: PropTypes.string.isRequired,
};

export default PriceRange;
