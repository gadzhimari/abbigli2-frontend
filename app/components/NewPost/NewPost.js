import React from 'react';
import PropTypes from 'prop-types';

import { __t } from '../../i18n/translator';
import './NewPost.less';

const NewPost = ({
  data,
}) => {
  return (
    <div className="new-post">
      <div className="new-post__img-wrap">
        <img
          className="new-post__img"
          src="/images/temp/2.png"
          alt={data.title}
        />
      </div>
      <div className="new-post__info">
        <div className="new-post__rubric">
          {
            data.type === 3
              ? __t('New in events')
              : __t('New in blogs')
          }
        </div>
        <a className="new-post__title">
          <svg className="icon icon-bag">
            <use xlinkHref="#icon-bag" />
          </svg>
          {data.title}
        </a>
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
                alt={data.author.name}
              />
            </div>
            {data.author.name}
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
