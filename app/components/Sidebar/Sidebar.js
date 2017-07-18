import React from 'react';

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
}) => (
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
        title={__t('New in blogs')}
        seeAllUrl="/blogs"
      />
      <SidebarList
        items={popularPosts}
        title={__t('Popular in blogs')}
        seeAllUrl="/blogs?popular=true"
      />
    </div>
  );

export default Sidebar;
