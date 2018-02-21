import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import { FavoriteAdd, Share } from 'components';
import TagsList from './TagsList';
import SidebarList from './SidebarList';

import { __t } from '../../i18n/translator';

import './Sidebar.less';

const urls = {
  4: 'blog',
  3: 'event',
};

class Sidebar extends PureComponent {
  static propTypes = {
    isFavorited: PropTypes.bool.isRequired,
    toggleFavorite: PropTypes.func.isRequired,
  };

  render() {
    const {
      data: {
        tags,
        type,
        slug,
        title,
        images,
      },
      newPosts,
      popularPosts,
      isFavorited,
      toggleFavorite,
      seeAllUrl,
      newSectionTitle,
      popularSectionTitle,
    } = this.props;
    const imageUrl = images && images[0] && images[0].file;

    return (
      <div className="sidebar">
        <div className="sidebar__group sidebar__group_favourite">
          <FavoriteAdd
            toggleFavorite={toggleFavorite}
            isFavorited={isFavorited}
          />
        </div>
        <TagsList
          tags={tags}
          type={type}
        />
        <div className="sidebar__group sidebar__group_social">
          <Share
            buttonClass="social-btn"
            postLink={`/${urls[type]}/${slug}`}
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
