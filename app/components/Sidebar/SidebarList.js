import React, { PureComponent } from 'react';
import SidebarListItem from './SidebarListItem';

import Link from '../Link/Link';

import { __t } from '../../i18n/translator';

class SidebarList extends PureComponent {
  render() {
    const { items, title, seeAllUrl, type } = this.props;
    const visibleItems = items.slice(0, 4);

    return (
      items.length > 0 &&
      <div className="sidebar__group">
        <div className="sidebar__title">
          {title}
        </div>

        <div className="sidebar-news">
          {visibleItems.map(item => (
            <SidebarListItem key={item.id} data={item} type={type} />
          ))
          }

          <Link
            className="show-more"
            to={seeAllUrl}
          >
            {__t('See more')}

            <svg className="icon icon-arrow" viewBox="0 0 11.3 19.6">
              <path d="M0.7,0.6c-0.8,0.8-0.9,2.1-0.1,2.9l5.9,6.4l-5.9,6.3c-0.8,0.9-0.8,2.2,0.1,2.9 c0.9,0.7,2.1,0.7,2.9-0.1l7.2-7.8c0.1-0.1,0.1-0.1,0.2-0.2l0,0c0.1-0.1,0.1-0.2,0.2-0.3l0,0c0-0.1,0.1-0.2,0.1-0.3v-0.1 c0-0.1,0-0.2,0-0.2c0-0.1,0-0.1,0-0.2c0-0.1,0-0.1,0-0.2c0-0.1,0-0.2,0-0.2V9.4c0-0.1-0.1-0.2-0.1-0.3l0,0C11.1,9,11.1,8.9,11,8.8 l0,0c-0.1-0.1-0.1-0.2-0.2-0.2L3.6,0.7C2.8-0.2,1.5-0.2,0.7,0.6z" />
            </svg>
          </Link>
        </div>
      </div>
    );
  }
}

export default SidebarList;
