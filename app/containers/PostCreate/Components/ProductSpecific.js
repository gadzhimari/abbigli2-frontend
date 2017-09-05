import React from 'react';
import PropTypes from 'prop-types';

import { ErrorInput } from 'components/Inputs';
import { ChoiceColor } from 'components/FiltersSelects';

import { __t } from '../../../i18n/translator';

const ProductSpecific = ({ shouldShow, priceValue, errors, onChange, colorValue }) => {
  if (!shouldShow) {
    return null;
  }

  const changeColor = ({ target }) => onChange({
    target: {
      name: 'color',
      value: target.dataset.color,
    },
  });

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
      <ChoiceColor
        isMobile
        onChange={changeColor}
        activeColor={colorValue}
      />
    </div>
  );
};

ProductSpecific.propTypes = {
  shouldShow: PropTypes.bool.isRequired,
  priceValue: PropTypes.string.isRequired,
  colorValue: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  errors: PropTypes.shape({
    price: PropTypes.array,
  }).isRequired,
};

export default ProductSpecific;
