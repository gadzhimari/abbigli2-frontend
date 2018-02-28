import React, { PureComponent } from 'react';
import Type from 'prop-types';

import { POST_DATE_FORMAT } from '../../lib/date/formats';
import toLocaleDateString from '../../lib/date/toLocaleDateString';

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
        { toLocaleDateString(start, POST_DATE_FORMAT) }
        { end && ` - ${toLocaleDateString(end, POST_DATE_FORMAT)}`}
      </span>
    );
  }
}

export default DateRange;
