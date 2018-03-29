import PropTypes from 'prop-types';
import React, { Component } from 'react';
import DayPicker, { DateUtils } from 'react-day-picker';
import MomentLocaleUtils from 'react-day-picker/moment';
import 'react-day-picker/lib/style.css';
import moment from 'moment';

import 'moment/locale/ru';

import { location } from '../../config';
import toLocaleDateString from '../../lib/date/toLocaleDateString';

const EN_DATE_FORMAT = 'MMMM Do YYYY';
const RU_DATE_FORMAT = 'Do MMMM YYYY';

const overlayStyle = {
  position: 'absolute',
  background: 'white',
  boxShadow: '0 2px 5px rgba(0, 0, 0, .15)',
  zIndex: '100',
  left: '-12px',
};

class DateInput extends Component {
  static propTypes = {
    onChange: PropTypes.func.isRequired,
    onFocus: PropTypes.func,
    placeholder: PropTypes.string,
    name: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    className: PropTypes.string.isRequired,
    format: PropTypes.string,
    mustFormat: PropTypes.bool,
  };

  static defaultProps = {
    onFocus: () => true,
    mustFormat: true,
    format: 'YYYY-MM-DDThh:mm',
    placeholder: '',
  };

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
    this.setState({ showOverlay: true });
    this.props.onFocus();
  }

  hideOverlay = () => {
    this.setState({ showOverlay: this.clickInside });
    this.clickInside = false;
  }

  handleDayClick = (day) => {
    const { name, onChange } = this.props;
    const value = moment(day).format(this.props.format);

    this.setState({ selectedDay: day, showOverlay: false });
    onChange(null, { name, value });
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

    const formate = location === 'en' ? EN_DATE_FORMAT : RU_DATE_FORMAT;
    const formatedValue = value && mustFormat
      ? toLocaleDateString(value, formate) : value;

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
                localeUtils={MomentLocaleUtils}
                locale={location}
              />
            </div>
          </div>)
        }
      </div>
    );
  }
}

export default DateInput;
