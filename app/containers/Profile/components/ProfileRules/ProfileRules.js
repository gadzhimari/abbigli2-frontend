import map from 'lodash/map';
import pick from 'lodash/pick';

import { React, PureComponent, Type, cn } from '../../../../components-lib/__base';

import ProfileSection from '../ProfileSection';
import sections from './sections';

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
    const pickedData = pick(data, map(sections, 'id'));
    const isEmptyAllItems = Object.values(pickedData).every(v => !!v);

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
              text={pickedData[section.id]}
              defaultText={section.defaultText}
            />
          )
        }
      </div>
    );
  }
}

export default ProfileRules;
