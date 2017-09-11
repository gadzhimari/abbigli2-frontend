import PropTypes from 'prop-types';
import React from 'react';
import RouterLink from 'react-router/lib/Link';
import moment from 'moment';
import { DOMAIN_URL } from 'config';

export default function SidebarItem(props) {
  const { data } = props;

  const urls = {
    3: 'event',
    4: 'blog',
  };

  return (
    <RouterLink className="sidebar__item-preview" to={'/' + urls[data.type] + '/' + data.slug}>
      <div className="sidebar__item-pic"> {data.images[0] && <img
        src={`${DOMAIN_URL}thumbs/unsafe/92x92/${data.images[0].file}`}
        alt={data.title} />} </div>
      <div className="sidebar__item-title">{data.title}</div>
      <div className="sidebar__item-date">{moment(data.created).format('D MMMM YYYY')}</div>
    </RouterLink>
  );
}


