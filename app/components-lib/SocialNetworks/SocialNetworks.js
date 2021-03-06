import { React, PureComponent, Fragment, Type, cn } from '../__base';

import ShareButton from '../../components/Share/Buttons/ShareButton';
import {
  FACEBOOK_PROVIDER,
  VK_PROVIDER,
  PINTEREST_PROVIDER,
  GOOGLE_PROVIDER,
  ODNOKLASSNIKI_PROVIDER,
} from '../../lib/constants/social';
import { socialGroupsUrl, location } from '../../config';

@cn('SocialNetworks')
class SocialNetworks extends PureComponent {
  static propTypes = {
    /** Дополнительный класс */
    className: Type.string,
  };

  render(cn) {
    return (
      <div className={cn()}>
        <ShareButton
          className="social-btn"
          provider={FACEBOOK_PROVIDER}
          href={socialGroupsUrl.fb}
          openedWindow={false}
        />
        <ShareButton
          className="social-btn"
          provider={PINTEREST_PROVIDER}
          href={socialGroupsUrl.pinterest}
          openedWindow={false}
        />
        <ShareButton
          className="social-btn google-plus"
          provider={GOOGLE_PROVIDER}
          href={socialGroupsUrl.google}
          openedWindow={false}
        />
        {
          location === 'ru'
          &&
          <Fragment>
            <ShareButton
              className="social-btn vkontakte"
              provider={VK_PROVIDER}
              href={socialGroupsUrl.vk}
              openedWindow={false}
            />
            <ShareButton
              className="social-btn"
              provider={ODNOKLASSNIKI_PROVIDER}
              href={socialGroupsUrl.ok}
              openedWindow={false}
            />
          </Fragment>
        }
      </div>
    );
  }
}

export default SocialNetworks;
