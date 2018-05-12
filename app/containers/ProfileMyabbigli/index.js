import React, { Component } from 'react';

import Attach from '../Profile/components/Attach';
import { Product } from '../../components-lib/Cards';

import wrapper from '../../HOC/profileSectionsWrapper';
import paginateWrapper from '../../HOC/paginate';

import { gaSendClickEvent } from '../../lib/analitics';
import { PRODUCT_TYPE } from '../../lib/constants/posts-types';

import { __t } from './../../i18n/translator';

import './index.less';

class ProfileMyabbigli extends Component {
  static fetchPosts = (props) => {
    const { params, loadPosts, query } = props;

    loadPosts({ ...query, author: params.profile }, PRODUCT_TYPE);
  }

  onCreateLinkClick = () => {
    gaSendClickEvent('profile', 'add');
  }

  render() {
    const {
      posts,
      isMe,
      deletePost,
      setLike,
      renderPaginator
    } = this.props;

    return (
      <div className="profile_content">
        {isMe &&
          <h5 className="my-abbigli__text">
            {__t('My.abbigly.propfile')}
          </h5>
        }

        {!isMe && !posts.length &&
          <h5 className="my-abbigli__text">
            {__t('Nothing here yet')}
          </h5>
        }

        <div className="cards-row">
          <Attach
            isVisible={isMe}
            type="product"
            url="/post/new"
            onClick={this.onCreateLinkClick}
          />

          {posts.map(item => (
            <Product
              key={item.slug}
              data={item}
              setLike={setLike}
              delete={deletePost}
              isMe={isMe}
              canEdit={isMe}
              view={2}
              showLike
              showShare
            />
          ))
          }
        </div>

        {renderPaginator()}
      </div>
    );
  }
}

export default wrapper(ProfileMyabbigli.fetchPosts, paginateWrapper(ProfileMyabbigli));
