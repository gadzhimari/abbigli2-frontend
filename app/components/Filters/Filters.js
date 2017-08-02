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
  applyFilters,
}) => {
  const activeSection = sections.filter(item => item.slug === section)[0];
  const activeSectionTitle = activeSection ? activeSection.title : '';

  return (
    <div className="filter">
      <Select
        subClass="select_new"
        activeItem={__t('New')}
        listItems={[__t('New'), __t('Popular')]}
        ItemComponent={TextSelect}
        onChange={updateFilter}
        name="filter"
      />
      <Select
        placeholder={__t('Choice a section')}
        listItems={sections}
        className="choice-section"
        activeItem={activeSectionTitle}
        ItemComponent={SectionSelect}
        onChange={updateFilter}
        name="section"
      />
      <ChoiceColor
        activeColor={color}
        onChange={updateFilter}
      />
      <Select
        subClass="select_distance"
        listItems={['1000', '500', '100', '50']}
        placeholder={__t('Being in the radius (km)')}
        activeItem={radius}
        ItemComponent={TextSelect}
        onChange={updateFilter}
        name="distance"
      />
      <PriceRange
        priceFrom={priceFrom}
        priceTo={priceTo}
        onChange={updateFilter}
      />
      <button
        className="default-button"
        type="button"
        onClick={applyFilters}
      >
        Применить
      </button>
    </div >
  );
};

Filters.propTypes = {
  updateFilter: PropTypes.func.isRequired,
  applyFilters: PropTypes.func.isRequired,
  radius: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
  section: PropTypes.oneOfType([PropTypes.any, PropTypes.object]).isRequired,
  sections: PropTypes.oneOfType([PropTypes.any, PropTypes.object]).isRequired,
  priceFrom: PropTypes.string.isRequired,
  priceTo: PropTypes.string.isRequired,
};

export default Filters;
