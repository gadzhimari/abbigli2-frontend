import React, { Component, PropTypes } from 'react';

import { SelectInput } from 'components';

import moment from 'moment';

import Popup from '../CommonPopup';

import { API_URL } from 'config';
import { __t } from '../../../i18n/translator';

import './EventSearch.styl';

class EventSearch extends Component {
  constructor(props) {
    super(props);

    this.state = {
      city: null,
      start: moment(new Date()).format('YYYY-MM-DD'),
      end: null,
    };
  }

  changeCity = city => this.setState({
    city,
  });

  doSearch = () => {
    const { options } = this.props;
    const { city, start, end } = this.state;

    options.findEvents(city, start, end);
  }

  focusDate = ({ currentTarget }) => {
    document.getElementById(currentTarget.dataset.name).focus();
  }

  changeDate = ({ target }) => this.setState({
    [target.dataset.name]: target.value,
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
              <label className="popup-form__label" htmlFor="start">
                {__t('Date.from')}
              </label>
              <input
                data-name="start"
                id="start"
                onChange={this.changeDate}
                value={start}
                className="input events__search-input"
                type="date"
              />
            </div>
          </div>
          <div className="popup-form__field">
            <div
              className="input-wrap input-date"
            >
              <label className="popup-form__label" htmlFor="end">
                {__t('Date.to')}
              </label>
              <input
                data-name="end"
                id="end"
                value={end}
                onChange={this.changeDate}
                className="input input events__search-input"
                type="date"
              />
            </div>
          </div>
          <div className="popup-form__field">
            <label className="popup-form__label">
              {__t('city')}
            </label>
            <div className="selectize-address">
              <svg className="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 12.6 18">
                <path d="M6.3,0C2.817,0,0,2.816,0,6.3C0,11.025,6.3,18,6.3,18s6.3-6.975,6.3-11.7C12.6,2.816,9.785,0,6.3,0z M6.3,8.55 c-1.242,0-2.25-1.008-2.25-2.25S5.058,4.05,6.3,4.05c1.241,0,2.25,1.008,2.25,2.25S7.542,8.55,6.3,8.55z" />
              </svg>
              <div className="selectize-control single" >
                <SelectInput
                  apiPath={`${API_URL}geo/cities/`}
                  inputWrapperClass="selectize-input selectize-input--search items not-full"
                  wrapperActiveClass="selectize-input"
                  inputClass="event-search__city-input"
                  resultsFieldWrapperClass="event-search__city-results"
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
