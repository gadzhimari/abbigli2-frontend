import React, { Component, PropTypes } from 'react';

import DayPicker, { DateUtils } from 'react-day-picker';
import moment from 'moment';

import { SelectInput } from 'components';

import { __t } from './../../i18n/translator';
import { API_URL } from 'config';

import './MobileEventsSearch.styl';

const overlayStyle = {
  position: 'absolute',
  background: 'white',
  boxShadow: '0 2px 5px rgba(0, 0, 0, .15)',
  zIndex: '100',
  left: '-12px'
};

class MobileEventsSearch extends Component {
  constructor(props) {
    super(props);

    this.state = {
      city: null,
      start: null,
      end: null,
    };

    this.input = null;
    this.daypickerFrom = null;
    this.daypickerTo = null;
    this.clickedFromInside = false;
    this.clickFromTimeout = null;
    this.clickedToInside = false;
    this.clicktToTimeout = null;
  }

  handleInputFocus(event, calendar) {
    switch (calendar) {
      case 'from':
        this.setState({
          showDayFromOverlay: true,
        });
        break;
      case 'to':
        this.setState({
          showDayToOverlay: true,
        });
        break;
    }
  }

  handleContainerMouseDown(e, calendar) {
    switch (calendar) {
      case 'from':
        this.clickedFromInside = true;
        this.clickFromTimeout = setTimeout(() => {
          this.clickedFromInside = false;
        }, 0);
        break;
      case 'to':
        this.clickedToInside = true;
        this.clickToTimeout = setTimeout(() => {
          this.clickedToInside = false;
        }, 0);
        break;
    }
  }

  handleInputBlur(event, calendar) {
    switch (calendar) {
      case 'from': {
        const showDayFromOverlay = this.clickedFromInside;

        this.setState({
          showDayFromOverlay,
        });

        break;
      }
      case 'to': {
        const showDayToOverlay = this.clickedToInside;

        this.setState({
          showDayToOverlay,
        });

        break;
      }
    }
  }

  handleDayClick(e, day, calendar) {
    switch (calendar) {
      case 'from':
        this.setState({
          start: moment(day).format('YYYY-MM-DD'),
          selectedDayFrom: day,
          showDayFromOverlay: false,
        });
        break;
      case 'to':
        this.setState({
          end: moment(day).format('YYYY-MM-DD'),
          selectedDayTo: day,
          showDayToOverlay: false,
        });
        break;
    }
  }

  handleInputChange(e, calendar) {
    switch (calendar) {
      case 'from':
        const { valueFrom } = e.target;
        const momentDayFrom = moment(valueFrom, 'L', true);
        if (momentDayFrom.isValid()) {
          this.setState({
            selectedDayFrom: momentDayFrom.toDate(),
            dayFrom: valueFrom,
          }, () => {
            this.daypickerFrom.showMonth(this.state.selectedDayFrom);
          });
        } else {
          this.setState({ dayFrom: valueFrom, selectedDayFrom: null });
        }
        break;
      case 'to':
        const { valueTo } = e.target;
        const momentDayTo = moment(valueTo, 'L', true);
        if (momentDayTo.isValid()) {
          this.setState({
            selectedDayTo: momentDayTo.toDate(),
            dayTo: valueTo,
          }, () => {
            this.daypickerTo.showMonth(this.state.selectedDayTo);
          });
        } else {
          this.setState({ dayTo: valueTo, selectedDayTo: null });
        }
        break;
    }
  }

  changeCity = (city) => {
    this.setState({
      city,
    });
  }

  doSearch = () => {
    const { findEvents } = this.props;
    const { city, start, end } = this.state;

    findEvents(city, start, end);
  }

  render() {
    const { closePopup } = this.props;

    return (<div className="popup-wrap" id="sendMessage" style={{ display: 'block' }}>
      <div className="popup" id="message-send-popup">
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
        <form className="popup-form">
          <div className="popup-form__field">
            <div
              className="input-wrap input-date"
              onMouseDown={(e) => this.handleContainerMouseDown(e, 'from')}
            >
              <input
                id="start-event"
                ref={(el) => { this.input = el; }}
                value={this.state.start || undefined}
                onChange={(e) => this.handleInputChange(e, 'from')}
                onFocus={(e) => this.handleInputFocus(e, 'from')}
                onBlur={(e) => this.handleInputBlur(e, 'from')}
                className="input events__search-input"
                type="text"
                placeholder={__t('Date.from')}
              />
              {
                this.state.showDayFromOverlay
                &&
                <div style={{ position: 'relative' }}>
                  <div style={overlayStyle}>
                    <DayPicker
                      ref={(el) => { this.daypickerFrom = el; }}
                      initialMonth={this.state.selectedDayFrom || undefined}
                      onDayClick={(e, day) => this.handleDayClick(e, day, 'from')}
                      selectedDays={day => DateUtils.isSameDay(this.state.selectedDayFrom, day)}
                    />
                  </div>
                </div>
              }
            </div>
            <div
              className="input-wrap input-date"
              onMouseDown={(e) => this.handleContainerMouseDown(e, 'to')}
            >
              <input id="end-event"
                ref={(el) => { this.input = el; }}
                value={this.state.end || undefined}
                onChange={(e) => this.handleInputChange(e, 'to')}
                onFocus={(e) => this.handleInputFocus(e, 'to')}
                onBlur={(e) => this.handleInputBlur(e, 'to')}
                className="input input events__search-input"
                type="text"
                placeholder={__t('Date.to')}
              />
              {
                this.state.showDayToOverlay
                &&
                <div style={{ position: 'relative' }}>
                  <div style={overlayStyle}>
                    <DayPicker
                      ref={(el) => { this.daypickerTo = el; }}
                      initialMonth={this.state.selectedDayTo || undefined}
                      onDayClick={(e, day) => this.handleDayClick(e, day, 'to')}
                      selectedDays={day => DateUtils.isSameDay(this.state.selectedDayTo, day)}
                    />
                  </div>
                </div>
              }
            </div>
            <div className="selectize-address">
              <svg className="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 12.6 18">
                <path d="M6.3,0C2.817,0,0,2.816,0,6.3C0,11.025,6.3,18,6.3,18s6.3-6.975,6.3-11.7C12.6,2.816,9.785,0,6.3,0z M6.3,8.55 c-1.242,0-2.25-1.008-2.25-2.25S5.058,4.05,6.3,4.05c1.241,0,2.25,1.008,2.25,2.25S7.542,8.55,6.3,8.55z" />
              </svg>
              <div
                className={`selectize-control single`}
              >
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
      </div>
    </div>);
  }
}

MobileEventsSearch.propTypes = {
  closePopup: PropTypes.func.isRequired,
  findEvents: PropTypes.func.isRequired,
};

export default MobileEventsSearch;
