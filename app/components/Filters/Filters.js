import React from 'react';
import PropTypes from 'prop-types';

import {
  ChoiceSection,
  PriceRange,
  ChoiceColor,
  ChoiceRadius,
} from 'components';

import { __t } from '../../i18n/translator';

import './Filters.less';

const Filters = ({
  section,
  sections,
  anyPrice,
  updateInput,
  priceFrom,
  priceTo,
  color,
  radius,
  updateCheckbox,
  updateSelect,
  updateColor,
}) => {
  return (
    <div className="filter">
      <ChoiceSection
        sections={sections}
        activeSection={section || ''}
        onChange={updateSelect}
      />
      <PriceRange
        disabled={anyPrice}
        onChange={updateInput}
        priceFrom={priceFrom}
        priceTo={priceTo}
      />
      <div className="checkbox-wrap">
        <input
          id="anyPrice"
          className="checkbox"
          type="checkbox"
          onChange={updateCheckbox}
          data-field="anyPrice"
        />
        <label className="label" htmlFor="anyPrice">
          {__t('Any price')}
        </label>
      </div>
      <ChoiceColor
        onChange={updateColor}
        activeColor={color}
      />
      <ChoiceRadius
        activeRadius={radius}
        onChange={updateSelect}
      />
    </div>
  );
};

Filters.propTypes = {
  updateInput: PropTypes.func.isRequired,
  updateSelect: PropTypes.func.isRequired,
  updateCheckbox: PropTypes.func.isRequired,
  updateColor: PropTypes.func.isRequired,
  radius: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
  section: PropTypes.oneOfType([PropTypes.any, PropTypes.object]).isRequired,
  sections: PropTypes.oneOfType([PropTypes.any, PropTypes.object]).isRequired,
  priceFrom: PropTypes.string.isRequired,
  priceTo: PropTypes.string.isRequired,
  anyPrice: PropTypes.bool.isRequired,
};

export default Filters;
