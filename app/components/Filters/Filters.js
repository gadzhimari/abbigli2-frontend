import React from 'react';
import PropTypes from 'prop-types';

import { Select, ChoiceColor, PriceRange } from 'components/FiltersSelects';
import TextSelect from 'components/FiltersSelects/Select/TextSelect';
import SectionSelect from 'components/FiltersSelects/Select/SectionSelect';

import { __t } from '../../i18n/translator';

import './Filters.less';

const Filters = ({
  sections,
  updateFilter,
  applyFilters,
  activeFilters,
  reversePriceRange,
}) => {
  const activeSection = sections.filter(item => item.slug === activeFilters.section)[0];
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
        canReset
      />
      <ChoiceColor
        activeColor={activeFilters.color}
        onChange={updateFilter}
      />
      <Select
        subClass="select_distance"
        listItems={['1000', '500', '100', '50']}
        placeholder={__t('Being in the radius (km)')}
        activeItem={activeFilters.distance}
        ItemComponent={TextSelect}
        onChange={updateFilter}
        name="distance"
        canReset
      />
      <PriceRange
        priceFrom={activeFilters.price_from}
        priceTo={activeFilters.price_to}
        onChange={updateFilter}
        reversePriceRange={reversePriceRange}
      />
      <button
        className="default-button"
        type="button"
        onClick={applyFilters}
      >
        {__t('Apply filters')}
      </button>
    </div >
  );
};

Filters.propTypes = {
  updateFilter: PropTypes.func.isRequired,
  applyFilters: PropTypes.func.isRequired,
  reversePriceRange: PropTypes.func.isRequired,
  sections: PropTypes.oneOfType([PropTypes.any, PropTypes.object]).isRequired,
  activeFilters: PropTypes.shape({
    price_from: PropTypes.string,
    price_to: PropTypes.string,
    section: PropTypes.string,
    color: PropTypes.string,
    distance: PropTypes.string,
  }).isRequired,
};

export default Filters;
