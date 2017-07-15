import React from 'react';
import PropTypes from 'prop-types';

import { ErrorInput } from 'components/Inputs';

import { __t } from '../../../i18n/translator';

const ProductSpecific = ({ shouldShow, priceValue, errors, onChange }) => {
  if (!shouldShow) {
    return null;
  }

  return (
    <div className="add-tabs__form-field">
      <ErrorInput
        className="input"
        id="priceGoods"
        name="price"
        value={priceValue}
        onChange={onChange}
        placeholder=""
        errors={errors.price}
        wrapperClass="add-tabs__form-price input-wrap"
        wrapperErrorClass="error"
        labelRequired
        label={__t('Price')}
      />
      <div className="color-choice">
        <div className="color-choice__label">
          {__t('Choise color')}
        </div>
        <div className="color-choice__wrap">
          <div className="color-choice__color color_red" />
          <div className="color-choice__color color_orange active" />
          <div className="color-choice__color color_yellow" />
          <div className="color-choice__color color_green" />
          <div className="color-choice__color color_skiey" />
          <div className="color-choice__color color_blue" />
          <div className="color-choice__color color_violet" />
          <div className="color-choice__color color_pink" />
          <div className="color-choice__color color_white" />
          <div className="color-choice__color color_gray" />
          <div className="color-choice__color color_black" />
          <div className="color-choice__color color_brown" />
        </div>
      </div>
    </div>
  );
};

ProductSpecific.propTypes = {
  shouldShow: PropTypes.bool.isRequired,
  priceValue: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  errors: PropTypes.shape({
    price: PropTypes.array,
  }).isRequired,
};

export default ProductSpecific;
