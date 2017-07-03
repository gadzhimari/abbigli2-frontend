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
import { __t } from '../../../i18n/translator';

import './FiltersPopup.less';

const radiuses = [1000, 500, 100, 30, 5];

const FiltersPopup = ({
  closePopup,
  section,
  sections,
  anyPrice,
  updateInput,
  priceFrom,
  priceTo,
  color,
  radius,
  updateCheckbox,
  updateColor,
}) => (
    <div className="filter-mobile">
      <div className="filter-mobile__header">
        {__t('Filters')}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 14 14.031"
          className="popup-close icon"
          onClick={closePopup}
        >
          <path d="M14,1.414L12.59,0L7,5.602L1.41,0L0,1.414l5.589,5.602L0,12.618l1.41,1.413L7,8.428l5.59,5.604L14,12.618 L8.409,7.016L14,1.414z" />
        </svg>
      </div>
      <div className="choice-section">
        <label className="label" htmlFor="anyPrice">
          {__t('Section')}
        </label>
        <div className="input-wrap">
          <select
            value={section || undefined}
            onChange={updateInput}
            className="input"
            data-field="section"
          >
            <option>{__t('Choice a section')}</option>
            {
              sections.map(item => (
                <option key={item.id}>
                  {item.title}
                </option>
              ))
            }
          </select>
        </div>
      </div>
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
        isMobile
      />
      <div className="select-wrap">
        <div className="label">
          {__t('Being in the radius (km)')}
        </div>
        <div className="select">
          <select
            value={radius}
            onChange={updateInput}
            className="input"
            data-field="radius"
            placeholder={__t('Being in the radius (km)')}
          >
            {
              radiuses.map((item, key) => (
                <option key={key}>
                  {item}
                </option>
              ))
            }
          </select>
        </div>
      </div>
      <button
        className="default-button"
        type="button"
      >
        {__t('Apply Filters')}
      </button>
    </div >
  );

FiltersPopup.propTypes = {
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

export default connect(mapStateToProps, mapDispatchToProps)(FiltersPopup);
