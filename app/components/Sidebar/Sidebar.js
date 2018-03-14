import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import { FavoriteAdd, Share } from '../';
import TagsList from './TagsList';
import SidebarList from './SidebarList';

import createPostLink from '../../lib/links/post-link';

import './Sidebar.less';

class Sidebar extends PureComponent {
  static propTypes = {
    isFavorited: PropTypes.bool.isRequired,
    toggleFavorite: PropTypes.func.isRequired,
  };

  render() {
    const {
      newPosts,
      popularPosts,
      isFavorited,
      toggleFavorite,
      seeAllUrl,
      newSectionTitle,
      popularSectionTitle,
    } = this.props;

    const {
      tags,
      type,
      title,
      images,
      slug
    } = this.props.data;
    const imageUrl = images && images[0] && images[0].file;

    return (
      <div className="sidebar">
        <div className="sidebar__group sidebar__group_favourite">
          <FavoriteAdd
            toggleFavorite={toggleFavorite}
            isFavorited={isFavorited}
            slug={slug}
          />
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
