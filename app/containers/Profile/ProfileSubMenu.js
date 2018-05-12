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
    const { data, path } = this.props;

    // const showFavorites = isMe || favoritesVisible;

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

        <Link
          to={`/profile/${data.id}/favorites`}
          onClick={this.onLinkClick}
          className={cn('item', { active: path === 'favorites' })}
          name="favorites"
        >
          <Icon glyph="heart" />

          {__t('Favorites')}
        </Link>

        <Link
          to={`/profile/${data.id}/blogs`}
          onClick={this.onLinkClick}
          className={cn('item', { active: path === 'blogs', blog: true })}
          name="blogs"
        >
          <Icon glyph="blog" />

          {__t('Blogs')}
        </Link>

        <Link
          to={`/profile/${data.id}/events`}
          onClick={this.onLinkClick}
          className={cn('item', { active: path === 'events', event: true })}
          name="events"
        >
          <Icon glyph="event" />

          {__t('Events')}
        </Link>

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
