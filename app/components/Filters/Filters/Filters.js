import React from 'react';
import PropTypes from 'prop-types';

import { Select, EventGroup, PriceRange, ProductGroup, DateRange } from 'components/FiltersSelects';
import SectionSelect from 'components/FiltersSelects/Select/SectionSelect';

import { __t } from '../../../i18n/translator';

import './Filters.less';

const postTypes = [{
  title: __t('Items'),
  slug: 1,
},
{
  title: __t('Blogs'),
  slug: 4,
},
{
  title: __t('Events'),
  slug: 3,
}];

const Filters = ({
  sections,
  updateFilter,
  applyFilters,
  activeFilters,
  reversePriceRange,
  changeFiltersType,
  openCityPopup,
}) => {
  const activeSection = sections.filter(item => item.slug === activeFilters.section)[0];
  const activeSectionTitle = activeSection ? activeSection.title : '';
  const activeType = postTypes
    .filter(item => item.slug === Number(activeFilters.type))[0] || postTypes[0];

  return (
    <div className="filter">
      <Select
        subClass="select_new"
        activeItem={activeType.title}
        listItems={postTypes}
        ItemComponent={SectionSelect}
        onChange={changeFiltersType}
        name="filter"
      />
      {
        activeFilters.type === '1'
        &&
        <ProductGroup
          activeSectionTitle={activeSectionTitle}
          sections={sections}
          activeFilters={activeFilters}
          updateFilter={updateFilter}
        />
      }
      {
        activeFilters.type === '1'
        &&
        <PriceRange
          priceFrom={activeFilters.price_from}
          priceTo={activeFilters.price_to}
          onChange={updateFilter}
          reversePriceRange={reversePriceRange}
        />
      }
      {
        activeFilters.type === '3'
        &&
        <EventGroup
          activeSectionTitle={activeSectionTitle}
          sections={sections}
          activeFilters={activeFilters}
          updateFilter={updateFilter}
          openCityPopup={openCityPopup}
        />
      }
      {
        activeFilters.type === '3'
        &&
        <DateRange
          updateDate={updateFilter}
          dateStart={activeFilters.date_start}
          dateEnd={activeFilters.date_end}
          wrapperClass="period"
        />
      }
      {
        activeFilters.type === '4'
        &&
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
      }
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
  changeFiltersType: PropTypes.func.isRequired,
  openCityPopup: PropTypes.func.isRequired,
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
