import React, { PureComponent } from 'react';
import Type from 'prop-types';
import classNames from 'classnames';

import Link from '../../components/Link/Link';

import { gaSendClickEvent } from '../../lib/analitics';
import scrollTo from '../../utils/scrollTo';
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

  componentDidMount() {
    this.scrollToMenu();
  }

  componentDidUpdate() {
    this.scrollToMenu();
  }

  onLinkClick = (e, { name }) => {
    gaSendClickEvent('profile', name);
  }

  scrollToMenu() {
    const elementY = window.pageYOffset + this.submenu.getBoundingClientRect().top;
    scrollTo(elementY, 500);
  }

  render() {
    const { data, isMe, path } = this.props;

    const { is_favorite_visible: showFavorites,
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
            onClick={this.onClickFavorites}
            className={classNames(commonClass, 'my-favorites',
              { active: path === 'favorites' })
            }
            name="favorites"
          >
            <div className="icon-wrap">
              <svg className="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 34 31.193">
                <path d="M17,31.193l-2.467-2.242C5.778,21.011,0,15.774,0,9.35C0,4.113,4.113,0,9.351,0C12.308,0,15.147,1.377,17,3.552 C18.853,1.377,21.691,0,24.649,0C29.886,0,34,4.113,34,9.35c0,6.425-5.781,11.661-14.537,19.618L17,31.193z" />
              </svg>
            </div>
            {__t('Favorites')}
          </Link>
        }

        {(isMe || showFeed) &&
          <Link
            to={`/profile/${data.id}/feed`}
            onClick={this.onClickFeed}
            className={classNames(commonClass, 'feed',
              { active: path === 'feed' })
            }
            name="feed"
          >
            <div className="icon-wrap">
              <svg className="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 10 10">
                <path d="M6,10V5h4v5H6z M6,0h4v3H6V0z M0,7h4v3H0V7z M0,0h4v5H0V0z" />
              </svg>
            </div>
            {__t('Feed')}
          </Link>
        }

        {isMe &&
          <Link
            to="/chat"
            onClick={this.onClickMessages}
            className={classNames(commonClass, 'feed',
              { active: path === 'messages' })
            }
            name="messages"
          >
            <div className="icon-wrap">
              <svg className="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 10 8">
                <path d="M9,0H1C0.45,0,0.005,0.449,0.005,1L0,7c0,0.55,0.45,1,1,1h8c0.55,0,1-0.45,1-1V1C10,0.449,9.55,0,9,0z M9,2 L5,4.5L1,2V1l4,2.5L9,1V2z" />
              </svg>
            </div>
            {__t('Messages')}
          </Link>
        }

        <Link
          to={`/profile/${data.id}/about`}
          onClick={this.onClickAbout}
          className={classNames(commonClass, 'feed',
            { active: path === 'about' })
          }
          name="about_me"
        >
          <div className="icon-wrap">
            <svg className="icon" viewBox="0 0 22.2 25.6">
              <g id="XMLID_44_">
                <path id="XMLID_61_" className="st0" d="M11.1,14C6.6,14,2.6,15.3,0,17.3c1.3,4.8,5.8,8.3,11.1,8.3c5.3,0,9.8-3.5,11.1-8.3 C19.6,15.3,15.6,14,11.1,14z" />
                <circle id="XMLID_77_" className="st0" cx="11.1" cy="6.3" r="6.3" />
              </g>
            </svg>
          </div>
          {__t('About me')}
        </Link>
      </div>
    );
  }
}
