import React from 'react';
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

const Sidebar = ({
  data,
  newPosts,
  popularPosts,
  isFavorited,
  toggleFavorite,
  seeAllUrl,
  newSectionTitle,
  popularSectionTitle,
}) => (
    <div className="sidebar">
      <div className="sidebar__group sidebar__group_favourite">
        <FavoriteAdd
          toggleFavorite={toggleFavorite}
          isFavorited={isFavorited}
        />
      </div>
      <TagsList
        tags={data.tags}
        type={data.type}
      />
      <div className="sidebar__group sidebar__group_social">
        <Share
          buttonClass="social-btn"
          postLink={`/${urls[data.type]}/${data.slug}`}
        />
      </div>
      <SidebarList
        items={newPosts}
        title={newSectionTitle}
        seeAllUrl={seeAllUrl}
      />
      <SidebarList
        items={popularPosts}
        title={__t('Popular in blogs')}
        seeAllUrl={`${seeAllUrl}?popular=true`}
      />
    </div>
  );

Sidebar.propTypes = {
  isFavorited: PropTypes.bool.isRequired,
  toggleFavorite: PropTypes.func.isRequired,
};

export default Sidebar;
