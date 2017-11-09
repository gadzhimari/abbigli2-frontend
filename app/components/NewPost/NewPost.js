import React from 'react';
import PropTypes from 'prop-types';

import { Link } from 'react-router';
import { __t } from '../../i18n/translator';
import { THUMBS_URL } from 'config';

import './NewPost.less';

const rubricByType = {
  4: __t('New in blogs'),
  3: __t('New in events'),
  1: __t('New in posts'),
};

const NewPost = ({ data }) => {
  if (!data) return null;

  const userName = data.user.profile_name || `user id: ${data.user.id}`;

  return (
    <div className="new-post">
      <Link className="new-post__img-wrap" to={data.view_on_site_url}>
        <img
          className="new-post__img"
          src={`${THUMBS_URL}unsafe/592x140/${data.images[0].file}`}
          alt={data.title}
        />
      </Link>
      <div className="new-post__info">
        <div className="new-post__rubric">
          {rubricByType[data.type]}
        </div>
        <Link className="new-post__title" to={data.view_on_site_url}>
          {data.title}
        </Link>
        <div className="new-post__date">
          {
            !!data.date
            &&
            data.date
          }
        </div>
        <div className="user-wrap">
          <a className="user">
            <div className="avatar">
              <img
                className="avatar__img"
                src="/images/temp/3.png"
                alt={userName}
              />
            </div>
            {userName}
          </a>
        </div>
      </div>
    </div>
  );
};

NewPost.propTypes = {
  data: PropTypes.object.isRequired,
};

export default NewPost;
