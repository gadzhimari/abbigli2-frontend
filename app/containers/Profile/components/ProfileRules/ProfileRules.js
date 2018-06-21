import map from 'lodash/map';
import pick from 'lodash/pick';

import { React, PureComponent, Type, cn } from '../../../../components-lib/__base';

import ProfileSection from '../ProfileSection';

import { __t } from '../../../../i18n/translator';

const sections = [
  {
    id: 'payment_info',
    title: __t('Rules'),
    placeholder: __t('Specify how you can pay for a purchase in your store'),
    defaultText: __t('Describe in maximum detail the rules of your store and how to pay for your items. Write information using a text editor. A more detailed description will increase the level of confidence in you'),
  },
  {
    id: 'delivery_info',
    title: __t('Delivery'),
    placeholder: __t('Specify the terms of delivery'),
    defaultText: __t('Describe in maximum detail the terms of delivery of your products'),
  },
  {
    id: 'refund_info',
    title: __t('Return item'),
    placeholder: __t('Specify return conditions'),
    defaultText: __t('Please describe in as much detail the conditions for the return of your products'),
  },
];

@cn('Profile')
class ProfileRules extends PureComponent {
  static propTypes = {
    data: Type.shape({
      payment_info: Type.string,
      delivery_info: Type.string,
      refund_info: Type.string,
    }),
    isMe: Type.bool,
  };

  static defaultProps = {
    isMe: false,
  };

  render(cn) {
    const { isMe, data } = this.props;
    const filteredData = pick(data, map(sections, 'id'));
    const isEmptyAllItems = Object.values(filteredData).every(v => !!v);

    if (!isMe && isEmptyAllItems) {
      return null;
    }

    return (
      <div className={cn('rules')}>
        {
          sections.map(section =>
            <ProfileSection
              key={section.id}
              id={section.id}
              title={section.title}
              placeholder={section.placeholder}
              text={filteredData[section.id]}
              defaultText={section.defaultText}
            />
          )
        }
      </div>
    );
  }
}

export default ProfileRules;
