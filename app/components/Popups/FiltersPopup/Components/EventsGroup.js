import React from 'react';
import PropTypes from 'prop-types';

import Select from './Select';
import DateInput from './Date';
import { CitySelect } from 'components/FiltersSelects';

import { __t } from '../../../../i18n/translator';

const EventsGroup = ({ options, sections, distances, openSelectPopup }) => {
  return (
    <div>
      <Select
        wrapperClass="choice-section"
        selectClass="input"
        placeholder="Выберите раздел"
        field="section"
        value={options.filters.section}
        options={sections}
        updateFilter={options.updateFilter}
      />
      <CitySelect
        updateFilter={options.updateFilter}
        value={options.filters.city}
        openCityPopup={openSelectPopup}
      />
      <Select
        wrapperClass="select select_distance"
        selectClass="input"
        placeholder="Нахождение в радиусе (км)"
        field="distance"
        value={options.filters.distance}
        options={distances}
        updateFilter={options.updateFilter}
      />
      <DateInput
        label={__t('Date.from')}
        name="date_start"
        value={options.filters.date_start}
        onChange={options.updateFilter}
      />
      <DateInput
        label={__t('Date.to')}
        name="date_end"
        value={options.filters.date_end}
        onChange={options.updateFilter}
      />
    </div>
  );
};

export default EventsGroup;
