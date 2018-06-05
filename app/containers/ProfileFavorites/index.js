import React, { PureComponent } from 'react';

import { withRouter } from 'react-router';

import { Card } from '../../components-lib/Cards';

import wrapper from '../../HOC/profileSectionsWrapper';
import paginateWrapper from '../../HOC/paginate';
import redirectHOC from '../../HOC/redirectHOC';

import { __t } from './../../i18n/translator';

import './index.less';
import TogglePrivacy from '../../components/TogglePrivacy/TogglePrivacy';

class ProfileFavorites extends PureComponent {
  static fetchPosts = (props) => {
    const { isMe, params, loadBookmarks, query } = props;

    loadBookmarks({
      ...query,
      isMe,
      author: params.profile
    });
  }

  render() {
    const {
      posts,
      isMe,
      deleteFromFavorite,
      setLike,
      renderPaginator,
      user: { favorites_visible: isVisible },
      togglePrivacy
    } = this.props;

    return (
      <div className="profile_content">
        <TogglePrivacy
          isVisible={isMe}
          status={!isVisible}
          onToggle={togglePrivacy}
          name="favorites_visible"
        />

        <div className="cards-row">
          {posts.map(item => (
            <Card
              data={item}
              key={item.slug}
              setLike={setLike}
              delete={deleteFromFavorite}
              view={2}
              isMe={isMe}
              showLike={false}
              showShare
            />
          ))
          }

          {isMe && !posts.length &&
            __t('Favorites.propfile')
          }

          {!isMe && !posts.length &&
            __t('Nothing here yet')
          }

          {renderPaginator()}
        </div>
      </div>);
  }
}

export default wrapper(
  ProfileFavorites.fetchPosts,
  withRouter(
    redirectHOC('favorites_visible')(
      paginateWrapper(ProfileFavorites)
    )
  )
);
