import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'recompose';

import Select from './Components/Select';
import DateInput from './Components/Date';
import { CitySelect } from 'components/FiltersSelects';

import { openPopup } from 'ducks/Popup/actions';
import { API_URL } from 'config';
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

class FiltersPopup extends PureComponent {
  onSelectPopupClose = () => this.props
    .dispatch(openPopup('filtersPopup', this.props.options));

  openSelectPopup = () => this.props
    .dispatch(openPopup('selectPopup', {
      onClickItem: this.props.options.changeCity,
      title: 'city',
      async: true,
      apiUrl: `${API_URL}geo/cities/`,
      onClose: this.onSelectPopupClose,
    }));

  applyFilters = () => {
    this.props.options.applyFilters();
    this.props.closePopup();
  }

  render() {
    const { closePopup, sections, options } = this.props;

    return (
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
          value={options.filters.section}
          options={sections}
          updateFilter={options.updateFilter}
        />
        <CitySelect
          updateFilter={options.updateFilter}
          value={options.filters.city}
          openCityPopup={this.openSelectPopup}
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
        <button
          className="default-button"
          type="button"
          onClick={this.applyFilters}
        >
          {__t('Apply Filters')}
        </button>
      </div >
    );
  }
}

const mapStateToProps = state => ({
  sections: state.Sections.items,
});

const enhance = compose(connect(mapStateToProps));

export default enhance(FiltersPopup);
