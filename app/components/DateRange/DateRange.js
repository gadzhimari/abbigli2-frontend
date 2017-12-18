import React, { PureComponent } from 'react';
import Type from 'prop-types';

import moment from 'moment';

import { location } from '../../config';
import { POST_DATE_FORMAT } from '../../lib/date/formats';

class DateRange extends PureComponent {
  static propTypes = {
    start: Type.string,
    end: Type.string,
  };

  render() {
    const { start, end } = this.props;

    if (!start) {
      return null;
    }

    return (
      <span>
        {moment(start).locale(location).format(POST_DATE_FORMAT)}
        {end && ` - ${moment(end).locale(location).format(POST_DATE_FORMAT)}`}
      </span>
    );
  }
}

export default DateRange;
