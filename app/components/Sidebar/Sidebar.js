import React from 'react';

import { FavoriteAdd, Share } from 'components';
import TagsList from './TagsList';
import SidebarList from './SidebarList';

import './Sidebar.less';

const urls = {
  4: 'blog',
  3: 'event',
};

const Sidebar = ({
  data,
  newPosts,
}) => {
  return (
    <div className="sidebar">
      <div className="sidebar__group sidebar__group_favourite">
        <FavoriteAdd />
      </div>
      <TagsList tags={data.tags} />
      <div className="sidebar__group sidebar__group_social">
        <Share
          buttonClass="social-btn"
          postLink={`/${urls[data.type]}/${data.slug}`}
        />
      </div>
      <SidebarList
        items={newPosts}
        title="Новое в блогах"
      />
      <SidebarList
        items={newPosts.slice(4)}
        title="Популярное в блогах"
      />
    </div>
  );
};

export default Sidebar;
