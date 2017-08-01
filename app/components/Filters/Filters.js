import React from 'react';
import PropTypes from 'prop-types';

import { Select, ChoiceColor, PriceRange } from 'components/FiltersSelects';
import TextSelect from 'components/FiltersSelects/Select/TextSelect';
import SectionSelect from 'components/FiltersSelects/Select/SectionSelect';

import { __t } from '../../i18n/translator';

import './Filters.less';

const Filters = ({
  section,
  sections,
  priceFrom,
  priceTo,
  color,
  radius,
  updateFilter,
}) => (
    <div className="filter">
      <Select
        name="select_new"
        activeItem={__t('New')}
        listItems={[__t('New'), __t('Popular')]}
        ItemComponent={TextSelect}
        onChange={updateFilter}
      />
      <Select
        placeholder={__t('Choice a section')}
        listItems={sections}
        className="choice-section"
        activeItem={section}
        ItemComponent={SectionSelect}
        onChange={updateFilter}
      />
      <ChoiceColor
        activeColor={color}
        onChange={updateFilter}
      />
      <Select
        name="select_distance"
        listItems={['1000', '500', '100', '50']}
        placeholder={__t('Being in the radius (km)')}
        activeItem={radius}
        ItemComponent={TextSelect}
        onChange={updateFilter}
      />
      <PriceRange
        priceFrom={priceFrom}
        priceTo={priceTo}
        onChange={updateFilter}
      />
      <button className="default-button" type="button">Применить</button>
    </div >
  );

Filters.propTypes = {
  updateFilter: PropTypes.func.isRequired,
  radius: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
  section: PropTypes.oneOfType([PropTypes.any, PropTypes.object]).isRequired,
  sections: PropTypes.oneOfType([PropTypes.any, PropTypes.object]).isRequired,
  priceFrom: PropTypes.string.isRequired,
  priceTo: PropTypes.string.isRequired,
};

export default Filters;
