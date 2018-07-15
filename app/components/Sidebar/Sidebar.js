import React, { PureComponent } from 'react';

import get from 'lodash/get';

import { FavoriteAdd, Share } from '../';
import TagsList from './TagsList';
import SidebarList from './SidebarList';

import createPostLink from '../../lib/links/post-link';

import './Sidebar.less';

class Sidebar extends PureComponent {
  render() {
    const {
      newPosts,
      popularPosts,
      seeAllUrl,
      newSectionTitle,
      popularSectionTitle,
      data,
      type,

      ...favoriteAddProps
    } = this.props;

    const { tags, title } = data;
    const postUrl = createPostLink(data, type);
    const imageUrl = get(data, 'images.0.file');

    return (
      <div className="sidebar">
        <div className="sidebar__group sidebar__group_favourite">
          <FavoriteAdd {...favoriteAddProps} />
        </div>
        <TagsList
          tags={tags}
          type={type}
        />
        <div className="sidebar__group sidebar__group_social">
          <Share
            buttonClass="social-btn"
            postLink={postUrl}
            media={imageUrl}
            description={title}
          />
        </div>
        <SidebarList
          items={newPosts}
          title={newSectionTitle}
          seeAllUrl={seeAllUrl}
          type={type}
        />
        <SidebarList
          items={popularPosts}
          title={popularSectionTitle}
          seeAllUrl={`${seeAllUrl}?popular=month`}
          type={type}
        />
      </div>
    );
  }
}

export default Sidebar;
