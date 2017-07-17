import React from 'react';
import PropTypes from 'prop-types';

import { ErrorInput, DateInput } from 'components/Inputs';

import { __t } from '../../../i18n/translator';

const EventSpecific = ({
  shouldShow,
  dateStart,
  dateEnd,
  errors,
  onChange,
  openCityPopup,
  city,
}) => {
  if (!shouldShow) {
    return null;
  }

  return (
    <div>
      <ErrorInput
        wrapperClass="add-tabs__form-field input-wrap"
        wrapperErrorClass="error"
        value={city.name}
        onClick={openCityPopup}
        name="date_start"
        errors={errors.city}
        className="input"
        label={__t('Place')}
        labelRequired
      />
      <div className="add-tabs__form-field">
        <ErrorInput
          wrapperClass="input-wrap add-tabs__form-calendar input-date"
          wrapperErrorClass="error"
          value={dateStart}
          onChange={onChange}
          name="date_start"
          errors={errors.date_start}
          component={DateInput}
          className="input"
          label={__t('Start.date')}
          labelRequired
        />
        <ErrorInput
          wrapperClass="input-wrap add-tabs__form-calendar input-date"
          wrapperErrorClass="error"
          value={dateEnd}
          onChange={onChange}
          name="date_end"
          errors={errors.date_end}
          component={DateInput}
          className="input"
          label={__t('End.date')}
        />
      </div >
    </div >
  );
};

EventSpecific.propTypes = {
  shouldShow: PropTypes.bool.isRequired,
  dateStart: PropTypes.string.isRequired,
  dateEnd: PropTypes.string.isRequired,
  errors: PropTypes.shape({
    city: PropTypes.array,
    date_start: PropTypes.array,
  }).isRequired,
  onChange: PropTypes.func.isRequired,
  openCityPopup: PropTypes.func.isRequired,
  city: PropTypes.shape({
    name: PropTypes.string,
    id: PropTypes.number,
  }).isRequired,
};

export default EventSpecific;
