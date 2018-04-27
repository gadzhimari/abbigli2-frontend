import React, { PureComponent } from 'react';
import Type from 'prop-types';
import classNames from 'classnames';

import Link from '../../components/Link/Link';
import { Icon } from '../../components-lib';

import { gaSendClickEvent } from '../../lib/analitics';
import { __t } from '../../i18n/translator';

export default class ProfileSubMenu extends PureComponent {
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

  render() {
    const { data, isMe, path } = this.props;

    const {
      is_favorite_visible: showFavorites,
      is_feed_visible: showFeed,
    } = data;

    const commonClass = 'profile-submenu__item';

    return (
      <div className="profile__submenu" ref={(c) => { this.submenu = c; }}>
        <a className="profile-submenu__item back">
          <div className="icon-wrap">
            <svg className="icon" xmlns="http://www.w3.org/2000/svg" viewBox="248.914 244 14.173 24">
              <polygon fill="#0D6AE3" points="259.954,244 248.914,256 259.954,268 263.087,264.596 255.178,256 263.087,247.404" />
            </svg>
          </div>
        </a>

        <Link
          to={`/profile/${data.id}/`}
          onClick={this.onLinkClick}
          className={classNames(commonClass, 'my-abbigli',
            { active: !path })
          }
          name="mypage"
        >
          <div className="icon-wrap">
            <div className="icon" />
          </div>
          {__t('My Abbigli')}
        </Link>

        {(isMe || showFavorites) &&
          <Link
            to={`/profile/${data.id}/favorites`}
            onClick={this.onLinkClick}
            className={classNames(commonClass, 'my-favorites',
              { active: path === 'favorites' })
            }
            name="favorites"
          >
            <div className="icon-wrap">
              <Icon glyph="heart" />
            </div>
            {__t('Favorites')}
          </Link>
        }

        {(isMe || showFeed) &&
          <Link
            to={`/profile/${data.id}/feed`}
            onClick={this.onLinkClick}
            className={classNames(commonClass, 'feed',
              { active: path === 'feed' })
            }
            name="feed"
          >
            <div className="icon-wrap">
              <Icon glyph="feed" />
            </div>
            {__t('Feed')}
          </Link>
        }

        {isMe &&
          <Link
            to="/chat"
            onClick={this.onLinkClick}
            className={classNames(commonClass, 'feed',
              { active: path === 'messages' })
            }
            name="messages"
          >
            <div className="icon-wrap">
              <Icon glyph="mail" />
            </div>
            {__t('Messages')}
          </Link>
        }

        <Link
          to={`/profile/${data.id}/about`}
          onClick={this.onLinkClick}
          className={classNames(commonClass, 'feed',
            { active: path === 'about' })
          }
          name="about_me"
        >
          <div className="icon-wrap">
            <Icon glyph="user" />
          </div>
          {__t('About me')}
        </Link>
      </div>
    );
  }
}
