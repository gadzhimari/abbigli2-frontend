/* eslint react/require-default-props: 0 */

import Type from 'prop-types';
import React, { PureComponent } from 'react';

import Follower from '../SearchPopup/UserItem';
import { FetchingButton } from 'components';

import { __t } from '../../../i18n/translator';

import './Followers.less';

class UsersPopup extends PureComponent {
  static propTypes = {
    closePopup: Type.func,
    loadMore: Type.func,
    nextPage: Type.number,
    canLoadMore: Type.bool,
    isLoadingMore: Type.bool,
    isMe: Type.bool,
    isAuth: Type.bool,
    items: Type.arrayOf(Type.shape({
      id: Type.number,
      profile_name: Type.string,
      avatar: Type.string,
    })),
    profile: Type.shape({
      id: Type.number,
    }),
  }

  static defaultProps = {
    items: [],
  }

  translater = __t;

  title = '';
  blankText = '';

  loadMore = () => {
    const { profile, isMe, isAuth, nextPage: page } = this.props;

    this.props.loadMore(profile.id, isMe, isAuth, { page });
  }

  render() {
    const { closePopup, items, canLoadMore, isLoadingMore } = this.props;

    return (
      <div className="popup-wrap" id="sendMessage" style={{ display: 'block' }}>
        <div
          className="popup mobile-search__popup register-popup"
        >
          <header className="mobile-search__header">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 14 14.031"
              className="popup-close icon"
              onClick={closePopup}
            >
              <path d="M14,1.414L12.59,0L7,5.602L1.41,0L0,1.414l5.589,5.602L0,12.618l1.41,1.413L7,8.428l5.59,5.604L14,12.618 L8.409,7.016L14,1.414z" />
            </svg>
            <div className="popup-title">
              {this.title}
            </div>
          </header>
          <div className="popup-subscribers">
            {
              items.length === 0
              &&
              this.blankText
            }
            {
              items.map(item => <Follower
                key={item.id}
                item={item}
                onClick={closePopup}
              />)
            }
            {
              canLoadMore
              &&
              <FetchingButton
                className="followers__loading"
                onClick={this.loadMore}
                isFetching={isLoadingMore}
              >
                {this.translater('Load more')}
              </FetchingButton>
            }
          </div>
        </div>
      </div>
    );
  }
}

export default UsersPopup;
