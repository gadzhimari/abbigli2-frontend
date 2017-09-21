import React from 'react';
import PropTypes from 'prop-types';

import { PriceRange, ProductGroup } from 'components/FiltersSelects';

import { __t } from '../../i18n/translator';

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
      <ProductGroup
        activeSectionTitle={activeSectionTitle}
        sections={sections}
        activeFilters={activeFilters}
        updateFilter={updateFilter}
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
