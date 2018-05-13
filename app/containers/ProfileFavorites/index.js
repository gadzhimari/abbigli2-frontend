import React, { PureComponent } from 'react';

import { withRouter } from 'react-router';

import { Card } from '../../components-lib/Cards';

import wrapper from '../../HOC/profileSectionsWrapper';
import paginateWrapper from '../../HOC/paginate';

import { __t } from './../../i18n/translator';

import './index.less';

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
      renderPaginator
    } = this.props;

    return (
      <div className="profile_content">
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
  withRouter(paginateWrapper(ProfileFavorites))
);
