import React, { Component, PropTypes } from 'react';
import DayPicker, { DateUtils } from 'react-day-picker';
import moment from 'moment';

import { SelectInput } from 'components';

import Popup from '../CommonPopup';

import { API_URL, location } from 'config';
import { __t } from '../../../i18n/translator';

const formate = location === 'en'
  ? 'dddd, MMMM Do YYYY'
  : 'dddd, Do MMMM YYYY';

class EventSearch extends Component {
  constructor(props) {
    super(props);

    this.state = {
      city: null,
      start: null,
      end: null,
    };
  }

  changeCity = city => this.setState({
    city,
  });

  doSearch = () => {
    const { options } = this.props;
    const { city, start, end } = this.state;
    const startDay = moment(start).format('YYYY-MM-DD');
    const endDay = moment(end).format('YYYY-MM-DD');

    options.findEvents(city, startDay, endDay);
  }

  focusDate = ({ currentTarget }) => {
    console.log(document.getElementById(currentTarget.dataset.name));
    document.getElementById(currentTarget.dataset.name).focus();
  }

  changeDate = ({ target }) => this.setState({
    [target.dataset.name]: moment(target.value)
      .locale(location)
      .format(formate),
  });

  render() {
    const { closePopup } = this.props;
    const { start, end } = this.state;

    return (
      <Popup
        closePopup={closePopup}
        title={__t('Find events')}
      >
        <form className="popup-form">
          <div className="popup-form__field">
            <div
              className="input-wrap input-date"
            >
              <input
                data-name="start"
                onChange={this.changeDate}
                value={start || undefined}
                className="input events__search-input"
                type="date"
                placeholder={__t('Date.from')}
              />
            </div>
          </div>
          <div className="popup-form__field">
            <div
              className="input-wrap input-date"
            >
              <input
                data-name="end"
                value={end || undefined}
                onChange={this.changeDate}
                className="input input events__search-input"
                type="date"
                placeholder={__t('Date.to')}
              />
            </div>
            <div className="selectize-address">
              <svg className="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 12.6 18">
                <path d="M6.3,0C2.817,0,0,2.816,0,6.3C0,11.025,6.3,18,6.3,18s6.3-6.975,6.3-11.7C12.6,2.816,9.785,0,6.3,0z M6.3,8.55 c-1.242,0-2.25-1.008-2.25-2.25S5.058,4.05,6.3,4.05c1.241,0,2.25,1.008,2.25,2.25S7.542,8.55,6.3,8.55z" />
              </svg>
              <div className="selectize-control single" >
                <SelectInput
                  apiPath={`${API_URL}geo/cities/`}
                  inputWrapperClass="selectize-input items not-full"
                  wrapperActiveClass="selectize-input--active"
                  inputClass=""
                  resultsFieldWrapperClass="selectize-input__results"
                  placeholder={__t('city')}
                  onSelectValue={this.changeCity}
                  currentValue={this.state.city}
                />
              </div>
            </div>
          </div>
          <div className="buttons-wrap">
            <button
              className="default-button"
              onClick={this.doSearch}
              type="button"
            >
              {__t('Find events')}
            </button>
          </div>
        </form>
      </Popup>
    );
  }
}

EventSearch.propTypes = {
  closePopup: PropTypes.func.isRequired,
  options: PropTypes.shape({
    findEvents: PropTypes.func.isRequired,
  }).isRequired,
};

export default EventSearch;
