import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import {
  ChoiceSection,
  PriceRange,
  ChoiceColor,
  ChoiceRadius,
} from 'components';

import { updateField } from 'ducks/Filters/actions';
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
  section: PropTypes.oneOfType([PropTypes.any, PropTypes.object]),
  sections: PropTypes.oneOfType([PropTypes.any, PropTypes.object]),
  priceFrom: PropTypes.string.isRequired,
  priceTo: PropTypes.string.isRequired,
  anyPrice: PropTypes.bool.isRequired,
};

const mapStateToProps = ({ Filters: filter, Sections }) => ({
  section: filter.section,
  priceFrom: filter.priceFrom,
  priceTo: filter.priceTo,
  anyPrice: filter.anyPrice,
  color: filter.color,
  radius: filter.radius,
  sections: Sections.items,
});

const mapDispatchToProps = dispatch => ({
  updateInput: ({ target }) => dispatch(updateField(target.dataset.field, target.value)),
  updateSelect: (field, value) => dispatch(updateField(field, value)),
  updateCheckbox: ({ target }) => dispatch(updateField(target.dataset.field, target.checked)),
  updateColor: ({ target }) => dispatch(updateField('color', target.dataset.color)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Filters);
