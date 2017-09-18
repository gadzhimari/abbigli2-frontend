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
      currentTarget: newTarget,
    });
  }

  render() {
    const { dateStart, dateEnd, wrapperClass, updateDate } = this.props;

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
            {
              dateStart
              &&
              <svg
                className="icon icon-close"
                viewBox="0 0 14 14.031"
                onMouseDown={updateDate}
                onTouchStart={updateDate}
                data-value=""
                data-field="date_start"
              >
                <path d="M14,1.414L12.59,0L7,5.602L1.41,0L0,1.414l5.589,5.602L0,12.618l1.41,1.413L7,8.428l5.59,5.604L14,12.618 L8.409,7.016L14,1.414z" />
              </svg>
            }
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
            {
              dateEnd
              &&
              <svg
                className="icon icon-close"
                viewBox="0 0 14 14.031"
                onMouseDown={updateDate}
                onTouchStart={updateDate}
                data-value=""
                data-field="date_end"
              >
                <path d="M14,1.414L12.59,0L7,5.602L1.41,0L0,1.414l5.589,5.602L0,12.618l1.41,1.413L7,8.428l5.59,5.604L14,12.618 L8.409,7.016L14,1.414z" />
              </svg>
            }
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
