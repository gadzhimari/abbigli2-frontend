import { React, Component, Type, cn } from '../../../../components-lib/__base';

import './ProfileBanner.less';

@cn('ProfileBanner')
class ProfileBanner extends Component {
  static propTypes = {
    data: Type.shape({
      type: Type.string,
      title: Type.string,
      raiseCount: Type.string,
      imageUrl: Type.string,
      price: Type.string,
      periodOfTime: Type.string,
    }).isRequired,
  }

  render(cn) {
    const {
      type,
      title,
      raiseCount,
      price,
      activationPeriod,
    } = this.props.data;

    return (
      <div className={cn({ type })}>
        <div className={cn('wrapper')}>
          <h2 className={cn('title')}>
            {title}
          </h2>
          <span className={cn('activation-period')}>
            {activationPeriod}
          </span>
          <div className={cn('footer')}>
            <span className={cn('raise-count')}>
              {raiseCount}
            </span>
            <span className={cn('price')}>
              {price}
            </span>
          </div>
        </div>
      </div>
    );
  }
}

export default ProfileBanner;
