import React from 'react';
import PropTypes from 'prop-types';

const DateInput = ({ label, value, onChange, name }) => (
  <div className="calendar">
    <label
      className="register-popup__label"
      htmlFor={name}
    >
      {label}
    </label>
    <div className="calendar__input">
      <input
        id={name}
        data-field={name}
        value={value}
        onChange={onChange}
        className="input"
        type="date"
      />
      {
        value
          ? <svg
            className="icon icon-close"
            viewBox="0 0 14 14.031"
            onClick={onChange}
            data-value=""
            data-field={name}
          >
            <path d="M14,1.414L12.59,0L7,5.602L1.41,0L0,1.414l5.589,5.602L0,12.618l1.41,1.413L7,8.428l5.59,5.604L14,12.618 L8.409,7.016L14,1.414z" />
          </svg>
          : <svg className="icon icon-event" viewBox="0 0 27 26">
            <path d="M22.2,3v2.1c0,2-1.6,3.5-3.5,3.5S15.1,7,15.1,5.1V3h-2.9v2.1c0,2-1.6,3.5-3.5,3.5 S5.1,7,5.1,5.1V3H0V26h27V3H22.2z M8.8,22.8H4.2v-4h4.5V22.8z M8.8,15.7H4.2v-4h4.5V15.7z M15.8,22.8h-4.5v-4h4.5V22.8z M15.8,15.7 h-4.5v-4h4.5V15.7z M18.2,22.8v-4h4.5L18.2,22.8z M22.8,15.7h-4.5v-4h4.5V15.7z" />
            <path d="M8.6,6.9c1,0,1.8-0.8,1.8-1.8V1.8c0-1-0.8-1.8-1.8-1.8S6.8,0.8,6.8,1.8v3.3 C6.8,6.1,7.6,6.9,8.6,6.9z" />
            <path d="M18.6,6.9c1,0,1.8-0.8,1.8-1.8V1.8c0-1-0.8-1.8-1.8-1.8s-1.8,0.8-1.8,1.8v3.3 C16.8,6.1,17.6,6.9,18.6,6.9z" />
          </svg>
      }
    </div>
  </div>
);

DateInput.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default DateInput;
