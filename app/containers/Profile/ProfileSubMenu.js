import { React, PureComponent, Type, cn } from '../../components-lib/__base';


import Link from '../../components/Link/Link';
import { Icon } from '../../components-lib';

import { gaSendClickEvent } from '../../lib/analitics';
import { __t } from '../../i18n/translator';

import './ProfileSubMenu.less';

@cn('ProfileSubMenu')
class ProfileSubMenu extends PureComponent {
  static propTypes = {
    isMe: Type.bool,
    path: Type.string,
    data: Type.shape({
      id: Type.number,
      is_favorite_visible: Type.bool,
      is_feed_visible: Type.bool,
    }),
  }

  onLinkClick = (e, { name }) => {
    gaSendClickEvent('profile', name);
  }

  render(cn) {
    const { data, isMe, path } = this.props;

    const {
      is_favorite_visible: favoritesVisible,
      is_feed_visible: feedVisible,
    } = data;

    const showFavorites = isMe || favoritesVisible;
    const showFeed = isMe || feedVisible;

    return (
      <div className={cn('')}>
        <Link
          to={`/profile/${data.id}/`}
          onClick={this.onLinkClick}
          className={cn('item', { active: !path })}
          name="mypage"
        >
          <Icon glyph="abbigli" />

          {__t('My Abbigli')}
        </Link>

        {showFavorites &&
          <Link
            to={`/profile/${data.id}/favorites`}
            onClick={this.onLinkClick}
            className={cn('item', { active: path === 'favorites' })}
            name="favorites"
          >
            <Icon glyph="heart" />

            {__t('Favorites')}
          </Link>
        }

        {showFeed &&
          <Link
            to={`/profile/${data.id}/feed`}
            onClick={this.onLinkClick}
            className={cn('item', { active: path === 'feed' })}
            name="feed"
          >
            <Icon glyph="feed" />

            {__t('Feed')}
          </Link>
        }

        {isMe &&
          <Link
            to="/chat"
            onClick={this.onLinkClick}
            className={cn('item')}
            name="messages"
          >
            <Icon glyph="mail" />

            {__t('Messages')}
          </Link>
        }

        <Link
          to={`/profile/${data.id}/about`}
          onClick={this.onLinkClick}
          className={cn('item', { active: path === 'about' })}
          name="about_me"
        >
          <Icon glyph="user" />

          {__t('About me')}
        </Link>
      </div>
    );
  }
}

export default ProfileSubMenu;
