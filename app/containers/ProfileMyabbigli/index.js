import React, { Component } from 'react';

import { Link, Icon } from '../../components-lib';
import { Product } from '../../components-lib/Cards';

import wrapper from '../../HOC/profileSectionsWrapper';
import paginateWrapper from '../../HOC/paginate';

import { gaSendClickEvent } from '../../lib/analitics';
import { PRODUCT_TYPE } from '../../lib/constants/posts-types';

import { __t } from './../../i18n/translator';

import './index.less';

class ProfileMyabbigli extends Component {
  static fetchPosts = (props) => {
    const { params, loadPosts } = props;

    loadPosts({ author: params.profile }, PRODUCT_TYPE);
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
          {isMe &&
            <div className="Card Card_type_attach">
              <div className="Card__attach">
                <Link
                  className="Card__button Card__button_attach"
                  onClick={this.onCreateLinkClick}
                  to={'/post/new'}
                  text={__t('add.on.abbigli')}
                  color="white"
                  size={'l'}
                  icon={<Icon
                    glyph="plus"
                    size="s"
                  />}
                />
              </div>
            </div>
          }

          {posts.map(item => (
            <Product
              key={item.slug}
              data={item}
              setLike={setLike}
              delete={deletePost}
              isMe={isMe}
              canEdit={isMe}
              view={2}
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
