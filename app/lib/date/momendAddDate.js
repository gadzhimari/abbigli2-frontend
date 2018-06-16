import moment from 'moment';
import localizateDate from './toLocaleDateString';

/**
 * Добавляет к дате указанное количество времени и локализует в указанном формате
 *
 * @param {Object} options
 * @param {Date} options.date - начальная дата
 * @param {Number} options.addNumber - количетво времени для добавления
 * @param {String} [options.timeKey=days] - подробнее тут: https://momentjs.com/docs/#/manipulating/add/
 * @param {String} options.format - желаемый формат выходной даты
 *
 * @returns {Moment}
 */
const momentAddDate = ({
  date,
  addNumber = 1,
  timeKey = 'days',
  format
}) => localizateDate(
  moment(date).add(addNumber, timeKey),
  format
);

export default momentAddDate;
