import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import { DateInput } from 'components/Inputs';

import { __t } from '../../../i18n/translator';
import './DateRange.less';

class DateRange extends PureComponent {
  onChangeDate = ({ target }) => {
    const newTarget = target;
    newTarget.dataset = {};
    newTarget.dataset.field = newTarget.name;

    this.props.updateDate({
      target: newTarget,
    });
  }

  render() {
    const { dateStart, dateEnd, wrapperClass } = this.props;

    return (
      <div className={wrapperClass}>
        <div className="calendar input-wrap">
          <div className="calendar__input">
            <DateInput
              className="input"
              placeholder={__t('Start.date')}
              name="date_start"
              value={dateStart}
              onChange={this.onChangeDate}
            />
          </div>
        </div >
        <div className="calendar input-wrap">
          <div className="calendar__input">
            <DateInput
              className="input"
              placeholder={__t('End.date')}
              name="date_end"
              value={dateEnd}
              onChange={this.onChangeDate}
            />
          </div>
        </div >
      </div>
    );
  }
}

DateRange.defaultProps = {
  dateStart: '',
  dateEnd: '',
  wrapperClass: 'date-range',
};

DateRange.propTypes = {
  updateDate: PropTypes.func.isRequired,
  dateStart: PropTypes.string,
  dateEnd: PropTypes.string,
  wrapperClass: PropTypes.string,
};

export default DateRange;
