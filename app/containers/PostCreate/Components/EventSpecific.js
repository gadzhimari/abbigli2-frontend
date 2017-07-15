import React from 'react';
import PropTypes from 'prop-types';

import { ErrorInput, DateInput } from 'components/Inputs';

import { __t } from '../../../i18n/translator';

const EventSpecific = ({ shouldShow }) => {
  if (!shouldShow) {
    return null;
  }

  return (
    <div>
      <div className="add-tabs__form-field input-wrap">
        <label className="label" htmlFor="placeEvent">
          {__t('Place')}
          <span className="label__required">*</span>
        </label>
        <input className="input" type="text" id="placeEvent" />
      </div>
      <div className="add-tabs__form-field">
        <div className="add-tabs__form-calendar">
          <label className="label" htmlFor="startEvent">
            {__t('Start.date')}
            <span className="label__required">*</span>
          </label>
          <div className="calendar input-wrap">
            <div className="calendar__input">
              <ErrorInput
                wrapperClass="input-wrap input-date"
                value={''}
                onChange={e => console.log(e)}
                name="date_start"
                errors={{}}
                component={DateInput}
                className="input"
              />
            </div>
          </div>
        </div >
        <div className="add-tabs__form-calendar">
          <label className="label" htmlFor="endEvent">
            {__t('End.date')}
            <span className="label__required">*</span>
          </label>
          <div className="calendar input-wrap">
            <div className="calendar__input">
              <ErrorInput
                wrapperClass="input-wrap input-date"
                value={''}
                onChange={e => console.log(e)}
                name="date_end"
                errors={{}}
                component={DateInput}
                className="input"
              />
            </div>
          </div >
        </div >
      </div >
    </div >
  );
};

EventSpecific.propTypes = {
  shouldShow: PropTypes.bool.isRequired,
};

export default EventSpecific;
