import React, { PureComponent } from 'react';

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

      ...favoriteAddProps
    } = this.props;

    const {
      tags,
      type,
      title,
      images
    } = data;
    const imageUrl = images && images[0] && images[0].file;

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
            postLink={createPostLink(this.props.data)}
            media={imageUrl}
            description={title}
          />
        </div>
        <SidebarList
          items={newPosts}
          title={newSectionTitle}
          seeAllUrl={seeAllUrl}
        />
        <SidebarList
          items={popularPosts}
          title={popularSectionTitle}
          seeAllUrl={`${seeAllUrl}?popular=true`}
        />
      </div>
    );
  }
}

export default Sidebar;
