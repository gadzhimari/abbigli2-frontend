import PropTypes from 'prop-types';
import React, { Component } from 'react';
import DayPicker, { DateUtils } from 'react-day-picker';
import moment from 'moment';

import { location } from 'config';

import 'react-day-picker/lib/style.css';

const overlayStyle = {
  position: 'absolute',
  background: 'white',
  boxShadow: '0 2px 5px rgba(0, 0, 0, .15)',
  zIndex: '100',
  left: '-12px',
};

class DateInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showOverlay: false,
      selectedDay: undefined,
    };
    this.clickInside = false;
  }

  getSelectedDays = day => DateUtils.isSameDay(this.state.selectedDay, day)

  showOverlay = () => {
    this.setState({
      showOverlay: true,
    });
    this.props.onFocus();
  }

  hideOverlay = () => {
    this.setState({
      showOverlay: this.clickInside,
    });
    this.clickInside = false;
  }

  handleDayClick = (event, day) => {
    this.setState({
      selectedDay: day,
      showOverlay: false,
    });
    this.props.onChange({
      target: {
        name: this.props.name,
        value: moment(day).format(this.props.format),
      },
    });
  }

  handleClickInside = () => {
    this.clickInside = true;
    setTimeout(() => {
      this.clickInside = false;
    }, 0);
  };

  render() {
    const {
      value,
      placeholder,
      className,
      mustFormat,
    } = this.props;

    const formate = location === 'en'
      ? 'MMMM Do YYYY'
      : 'Do MMMM YYYY';
    const formatedValue = value && mustFormat
      ? moment(value)
        .locale(location)
        .format(formate)
      : value;

    return (
      <div
        onMouseDown={this.handleClickInside}
      >
        <input
          id="start-date"
          name="startDate"
          className={className}
          type="text"
          value={formatedValue}
          onFocus={this.showOverlay}
          onBlur={this.hideOverlay}
          placeholder={placeholder}
        />

        {
          this.state.showOverlay
          &&
          (<div style={{ position: 'relative' }}>
            <div style={overlayStyle}>
              <DayPicker
                initialMonth={this.state.selectedDay}
                onDayClick={this.handleDayClick}
                selectedDays={this.getSelectedDays}
              />
            </div>
          </div>)
        }
      </div>
    );
  }
}

DateInput.defaultProps = {
  onFocus: () => true,
  mustFormat: true,
  format: 'YYYY-MM-DDThh:mm',
  placeholder: '',
};

DateInput.propTypes = {
  onChange: PropTypes.func.isRequired,
  onFocus: PropTypes.func,
  placeholder: PropTypes.string,
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  className: PropTypes.string.isRequired,
  format: PropTypes.string,
  mustFormat: PropTypes.bool,
};

export default DateInput;
