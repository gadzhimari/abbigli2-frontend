import PropTypes from 'prop-types';
import React, { Component } from 'react';

import { connect } from 'react-redux';

import { openPopup } from 'ducks/Popup/actions';

import { API_URL } from 'config';
import { __t } from '../../../i18n/translator';

import './EventSearch.styl';

class EventSearch extends Component {
  changeCity = city => this.props.changeField('city', city);

  doSearch = () => {
    const { city, start, end, options } = this.props;

    options.findEvents(city, start, end);
  }

  focusDate = ({ currentTarget }) => {
    document.getElementById(currentTarget.dataset.name).focus();
  }

  changeDate = ({ target }) => this.props
    .changeField(target.dataset.name, target.value);

  openSelectPopup = () => this.props
    .dispatch(openPopup('selectPopup', {
      onClickItem: this.changeCity,
      title: 'city',
      async: true,
      apiUrl: `${API_URL}geo/cities/`,
      onClose: () => this.props.dispatch(openPopup('eventSearch', {
        findEvents: this.props.options.findEvents,
      })),
    }));

  render() {
    const { closePopup } = this.props;
    const { start, end, city } = this.props;

    return (
      <div className="popup-wrap" id="sendMessage" style={{ display: 'block' }}>
        <div
          className="popup mobile-search__popup reset-popup"
        >
          <header className="mobile-search__header">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 14 14.031"
              className="popup-close icon"
              onClick={closePopup}
            >
              <path d="M14,1.414L12.59,0L7,5.602L1.41,0L0,1.414l5.589,5.602L0,12.618l1.41,1.413L7,8.428l5.59,5.604L14,12.618 L8.409,7.016L14,1.414z" />
            </svg>
            <div className="popup-title">
              {__t('Find events')}
            </div>
          </header>
          <form className="register-popup__form">
            <div className="register-popup__field">
              <label
                className="register-popup__label"
                htmlFor="start"
              >
                {__t('Date.from')}
              </label>
              <input
                data-name="start"
                id="start"
                onChange={this.changeDate}
                value={start}
                className="register-popup__input"
                type="date"
              />
            </div>
            <div className="register-popup__field">
              <label
                className="register-popup__label"
                htmlFor="end"
              >
                {__t('Date.to')}
              </label>
              <input
                data-name="end"
                id="end"
                value={end}
                onChange={this.changeDate}
                className="register-popup__input"
                type="date"
              />
            </div>
            <div className="register-popup__field">
              <label
                className="register-popup__label"
                htmlFor="city"
              >
                {__t('city')}
              </label>
              <input
                id="city"
                value={(city && city.name) || ''}
                className="register-popup__input"
                type="text"
                placeholder={__t('Select city')}
                onClick={this.openSelectPopup}
              />
            </div>
            <button
              className="register-popup__fetch-button"
              onClick={this.doSearch}
              type="button"
            >
              {__t('Find events')}
            </button>
          </form>
        </div>
      </div>
    );
  }
}

EventSearch.propTypes = {
  closePopup: PropTypes.func.isRequired,
  options: PropTypes.shape({
    findEvents: PropTypes.func.isRequired,
  }).isRequired,
};

const mapStateToProps = ({ Events }) => ({
  city: Events.searchFields.city,
  start: Events.searchFields.start,
  end: Events.searchFields.end,
});

export default connect(mapStateToProps)(EventSearch);
