import moment from 'moment';

import { location } from 'config';

export default (date, format) =>
  moment(date)
  .locale(location)
  .format(format);

