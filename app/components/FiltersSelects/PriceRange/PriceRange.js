import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import PriceInput from './PriceInput';

import { __t } from '../../../i18n/translator';
import './PriceRange.less';

const isNumberKey = key => ((key >= 48 && key <= 57) || (key >= 96 && key <= 105));
const isDeleteKey = key => key === 8;

const mustReverseRange = (priceFrom, priceTo) => Number(priceFrom) > Number(priceTo);

class PriceRange extends PureComponent {
  validateInput = (e) => {
    if (!(isNumberKey(e.keyCode) || isDeleteKey(e.keyCode))) {
      e.preventDefault();
    }
  }

  validateRange = () => {
    const { priceFrom, priceTo, reversePriceRange } = this.props;

    if (priceTo.length > 0 && mustReverseRange(priceFrom, priceTo)) {
      reversePriceRange();
    }
  }

  render() {
    const { priceFrom, priceTo, onChange } = this.props;

    return (
      <div className="price-range">
        <PriceInput
          className="input price-range__from"
          placeholder={__t('Price from')}
          validator={this.validateInput}
          onChange={onChange}
          value={priceFrom}
          field="price_from"
          pricePrefix={__t('From')}
        />
        <PriceInput
          className="input price-range__to"
          placeholder={__t('Price to')}
          validator={this.validateInput}
          onChange={onChange}
          value={priceTo}
          field="price_to"
          pricePrefix={__t('to')}
          onBlur={this.validateRange}
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
  reversePriceRange: PropTypes.func.isRequired,
  priceTo: PropTypes.string,
  priceFrom: PropTypes.string,
};

export default PriceRange;
