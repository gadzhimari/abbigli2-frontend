import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'recompose';

import Select from './Components/Select';
import { CitySelect } from 'components/FiltersSelects';

import mapFiltersToProps from '../../../HOC/mapFiltersToProps';

import { __t } from '../../../i18n/translator';

import './FiltersPopup.less';

const distances = [{
  slug: 1000,
  title: `${__t('Whithin')} 1000 ${__t('kilometers')}`,
  id: 0,
},
{
  slug: 500,
  title: `${__t('Whithin')} 500 ${__t('kilometers')}`,
  id: 1,
},
{
  slug: 100,
  title: `${__t('Whithin')} 100 ${__t('kilometers')}`,
  id: 2,
},
{
  slug: 50,
  title: `${__t('Whithin')} 50 ${__t('kilometers')}`,
  id: 3,
}];

const FiltersPopup = ({
  closePopup,
  sections,
  filters,
  updateFilter,
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
      <Select
        wrapperClass="choice-section"
        selectClass="input"
        placeholder="Выберите раздел"
        field="section"
        value={filters.section}
        options={sections}
        updateFilter={updateFilter}
      />
      <CitySelect
        updateFilter={updateFilter}
        value={filters.city}
      />
      <Select
        wrapperClass="select select_distance"
        selectClass="input"
        placeholder="Нахождение в радиусе (км)"
        field="distance"
        value={filters.distance}
        options={distances}
        updateFilter={updateFilter}
      />
      <button
        className="default-button"
        type="button"
      >
        {__t('Apply Filters')}
      </button>
    </div >
  );

const mapStateToProps = state => ({
  sections: state.Sections.items,
  routing: state.routing.locationBeforeTransitions,
});

const enhance = compose(connect(mapStateToProps), mapFiltersToProps);

export default enhance(FiltersPopup);
