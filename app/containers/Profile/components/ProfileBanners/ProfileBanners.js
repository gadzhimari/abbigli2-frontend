import { React, Component, Fragment, cn } from '../../../../components-lib/__base';
import { banners } from '../../../../lib/constants/banners';
import ProfileBanner from '../ProfileBanner';

@cn('Profile')
class ProfileBanners extends Component {
  render(cn) {
    return (
      <div className={cn('plans')}>
        <div className="Row Row_sal">
          {
            banners.map((item, index) =>
              <Fragment key={index}>
                {
                  index !== 2 &&
                  <div className="Col_sw_12 Col_mw_6 Col_lw_4">
                    <ProfileBanner
                      data={item}
                    />
                  </div>
                }
                {
                  index === 2 &&
                  <div className="Col_sw_12 Col_lw_4">
                    <ProfileBanner
                      data={item}
                    />
                  </div>
                }
              </Fragment>
            )
          }
        </div>
      </div>
    );
  }
}

export default ProfileBanners;
