import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import { __t } from '../../../i18n/translator';
import './PriceRange.less';

const isNumberKey = key => ((key >= 48 && key <= 57) || (key >= 96 && key <= 105));
const isDeleteKey = key => key === 8;

class PriceRange extends PureComponent {
  validateInput = (e) => {
    if (!(isNumberKey(e.keyCode) || isDeleteKey(e.keyCode))) {
      e.preventDefault();
    }
  }

  render() {
    const { priceFrom, priceTo, onChange } = this.props;

    return (
      <div className="price-range">
        <input
          className="input price-range__from"
          type="text"
          placeholder={__t('Price from')}
          onKeyDown={this.validateInput}
          onChange={onChange}
          value={priceFrom}
          data-field="price_from"
        />
        <input
          className="input price-range__to"
          type="text"
          placeholder={__t('Price to')}
          onKeyDown={this.validateInput}
          onChange={onChange}
          value={priceTo}
          data-field="price_to"
        />
      </div>
    );
  }
}

PriceRange.defaultProps = {
  priceTo: '',
  priceFrom: '',
};

PriceRange.propTypes = {
  onChange: PropTypes.func.isRequired,
  priceTo: PropTypes.string,
  priceFrom: PropTypes.string,
};

export default PriceRange;
