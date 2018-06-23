import { __t } from '../../i18n/translator';

export const ADS_DATE_PERIODS = [
  { value: 7, label: __t('dates.day', { days: 7 }) },
  { value: 15, label: __t('dates.day', { days: 15 }) },
  { value: 30, label: __t('dates.day', { days: 30 }) },
];

export const ADS_TARIFF_BY_PERIOD = {
  7: 5,
  15: 10,
  30: 15
};
