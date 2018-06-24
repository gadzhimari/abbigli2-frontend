import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';

import DayPicker, { DateUtils } from 'react-day-picker';
import MomentLocaleUtils from 'react-day-picker/moment';
import 'react-day-picker/lib/style.css';

import moment from 'moment';
import 'moment/locale/ru';

import { location } from '../../config';
import toLocaleDateString from '../../lib/date/toLocaleDateString';
import { isClickOutside } from '../../lib/window';

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
    placeholder: ''
  };

  state = {
    showOverlay: false,
    selectedDay: undefined,
  };

  // eslint-disable-next-line
  container = React.createRef();

  componentDidMount() {
    document.addEventListener('click', this.handleClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.handleClickOutside);
  }

  getSelectedDays = day => DateUtils.isSameDay(this.state.selectedDay, day)

  showOverlay = () => {
    this.setState({ showOverlay: true });

    if (this.props.onFocus) {
      this.props.onFocus();
    }
  }

  handleClickOutside = ({ target }) => {
    if (isClickOutside(this.container.current, target)) {
      this.hideOverlay();
    }
  }

  hideOverlay = () => {
    this.setState({ showOverlay: false });
  }

  handleDayClick = (day) => {
    const { name, onChange } = this.props;
    const value = moment(day).format(this.props.format);

    this.setState({ selectedDay: day, showOverlay: false });
    onChange(null, { name, value });
  }

  handleNativeInputChange = (e) => {
    const { name, onChange } = this.props;
    const value = moment(e.target.value).format(this.props.format);

    onChange(null, { name, value });
  }

  render() {
    const {
      value,
      placeholder,
      className,
      mustFormat,
      isTouch
    } = this.props;

    const format = location === 'en' ? EN_DATE_FORMAT : RU_DATE_FORMAT;
    const formatedValue = value && mustFormat
      ? toLocaleDateString(value, format) : value;


    if (isTouch) {
      const nativeValue = toLocaleDateString(value, 'YYYY-MM-DD');

      return (
        <input
          name={this.props}
          className={className}
          onChange={this.handleNativeInputChange}
          type="date"
          value={nativeValue}
          placeholder={placeholder}
        />
      );
    }

    return (
      <div ref={this.container}>
        <input
          id="start-date"
          name="startDate"
          className={className}
          type="text"
          value={formatedValue}
          onFocus={this.showOverlay}
          placeholder={placeholder}
          autoComplete="off"
        />

        {this.state.showOverlay &&
          <div style={{ position: 'relative' }}>
            <div style={overlayStyle}>
              <DayPicker
                initialMonth={this.state.selectedDay}
                onDayClick={this.handleDayClick}
                selectedDays={this.getSelectedDays}
                localeUtils={MomentLocaleUtils}
                locale={location}
              />
            </div>
          </div>
        }
      </div>
    );
  }
}

export default connect(({ isTouch }) => ({ isTouch }))(DateInput);
