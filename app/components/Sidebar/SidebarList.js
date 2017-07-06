import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import moment from 'moment';

import { DOMAIN_URL, location } from 'config';

const urls = {
  4: 'blog',
  3: 'event',
};

const SidebarList = ({
  items,
  title,
}) => {
  return (
    <div className="sidebar__group">
      <div className="sidebar__title">
        {title}
      </div>
      <div className="sidebar-news">
        {
          items
            .slice(0, 4)
            .map(item => (
              <div key={item.id} className="sidebar-news__item">
                <Link
                  className="sidebar-news__img"
                  to={`/${urls[item.type]}/${item.slug}`}
                >
                  <img
                    src={`${DOMAIN_URL}thumbs/unsafe/120x103/${item.images[0].file}`}
                    alt={item.title}
                  />
                </Link>
                <Link
                  className="sidebar-news__title"
                  to={`/${urls[item.type]}/${item.slug}`}
                >
                  {item.title}
                </Link>
                <div className="sidebar-news__date">
                  {
                    moment(item.created)
                      .locale(location)
                      .format('LL')
                  }
                </div>
              </div>
            ))
        }
        <Link
          className="show-more"
          to="/blogs"
        >
          Смотреть все
          <svg className="icon icon-arrow" viewBox="0 0 11.3 19.6">
            <path d="M0.7,0.6c-0.8,0.8-0.9,2.1-0.1,2.9l5.9,6.4l-5.9,6.3c-0.8,0.9-0.8,2.2,0.1,2.9 c0.9,0.7,2.1,0.7,2.9-0.1l7.2-7.8c0.1-0.1,0.1-0.1,0.2-0.2l0,0c0.1-0.1,0.1-0.2,0.2-0.3l0,0c0-0.1,0.1-0.2,0.1-0.3v-0.1 c0-0.1,0-0.2,0-0.2c0-0.1,0-0.1,0-0.2c0-0.1,0-0.1,0-0.2c0-0.1,0-0.2,0-0.2V9.4c0-0.1-0.1-0.2-0.1-0.3l0,0C11.1,9,11.1,8.9,11,8.8 l0,0c-0.1-0.1-0.1-0.2-0.2-0.2L3.6,0.7C2.8-0.2,1.5-0.2,0.7,0.6z" />
          </svg>
        </Link>
      </div>
    </div>
  );
};

export default SidebarList;
