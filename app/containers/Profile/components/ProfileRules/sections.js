import { __t } from '../../../../i18n/translator';

const sections = [
  {
    id: 'payment_info',
    title: __t('shop.policy.rules'),
    placeholder: __t('shop.policy.payMethod'),
    defaultText: __t('shop.policy.detailRules'),
  },
  {
    id: 'delivery_info',
    title: __t('shop.policy.delivery'),
    placeholder: __t('shop.policy.termsOfDelivery'),
    defaultText: __t('shop.policy.detailDelivery'),
  },
  {
    id: 'refund_info',
    title: __t('shop.policy.return'),
    placeholder: __t('shop.policy.conditionsOfReturn'),
    defaultText: __t('shop.policy.detailReturn'),
  },
];

export default sections;
