import React from 'react';
import PropTypes from 'prop-types';

import { CitySelect, DateRange, Sort } from 'components/FiltersSelects';


import { __t } from '../../../i18n/translator';
import './EventFilters.less';

const EventFilters = ({ openCityPopup, filters, updateFilter, applyFilters }) => {
  return (
    <div className="filter">
      <CitySelect
        openCityPopup={openCityPopup}
        value={filters.city}
      />
      <DateRange
        updateDate={updateFilter}
        dateStart={filters.date_start}
        dateEnd={filters.date_end}
      />
      <Sort
        name="sort"
        activeItem={filters.sort || 'New'}
        listItems={['New', 'Popular']}
        onChange={updateFilter}
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

EventFilters.propTypes = {
  openCityPopup: PropTypes.func.isRequired,
  updateFilter: PropTypes.func.isRequired,
  applyFilters: PropTypes.func.isRequired,
  filters: PropTypes.shape({
    city: PropTypes.string,
    date_start: PropTypes.string,
    date_end: PropTypes.string,
  }).isRequired,
};

export default EventFilters;
