import React, { PropTypes } from 'react';
import RouterLink from 'react-router/lib/Link';
import moment from 'moment';

export default function SidebarItem(props) {

    const {data} = props;

    const urls = {
        3: 'event',
        4: 'blog'
    }

    return (
        <RouterLink className="sidebar__item-preview" to={'/' + urls[data.type] + '/' + data.slug}>
            <div className="sidebar__item-pic"> {data.images[0] &&  <img
                src={`/thumbs/unsafe/92x92/${data.images[0].file}`}
                alt={data.title}/> } </div>
            <div className="sidebar__item-title">{data.title}</div>
            <div className="sidebar__item-date">{moment(data.created).format('D MMMM YYYY')}</div>
        </RouterLink>
    );
}


