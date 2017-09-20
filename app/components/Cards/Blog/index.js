import React, { Component } from 'react';
import PropTypes from 'prop-types';
import dateFormat from 'dateformat';
import { Share, Link } from 'components';

import { THUMBS_URL } from 'config';

import './index.less';

const typesUrl = {
  1: 'post',
  3: 'event',
  4: 'blog',
};

class BlogCard extends Component {
  render() {
    const { data } = this.props;

    return (
      <div className="blog-card">
        <div className="blog-card__img-wrap">
          <Link
            to={`/blog/${data.slug}`}
          >
            <img
              className="blog-card__img"
              src={`${THUMBS_URL}unsafe/360x250/${data.images[0] ? data.images[0].file : ''}`}
              alt={data.title}
            />
          </Link>
          <div className="share">
            <div className="share__icon" />
            <div className="dropdown-corner" />
            <div className="dropdown">
              <Share
                postLink={`/${typesUrl[data.type]}/${data.slug}`}
                buttonClass="social-btn"
              />
            </div>
          </div >
        </div >
        <div className="blog-card__info">
          <Link
            className="user"
            to={`/profile/${data.user.id}`}
          >
            <div className="avatar">
              {
                data.user.avatar
                  ? <img
                    src={`${THUMBS_URL}unsafe/36x36/${data.user.avatar}`}
                    alt={data.user.profile_name}
                    className="avatar__img"
                  />
                  : <img
                    src={'/images/svg/avatar.svg'}
                    alt={data.user.profile_name}
                    className="avatar__img"
                  />
              }
            </div>
            {data.user.profile_name}
          </Link>
          <Link
            className="blog-card__title"
            to={`/blog/${data.slug}`}
          >
            <div className="icon icon-blog"></div>
            {data.title}
          </Link>
          <div
            className="blog-card__text"
            dangerouslySetInnerHTML={{ __html: data.seo_description }}
          />
          <div className="blog-card__date">
            {dateFormat(data.created, 'd mmmm yyyy')}
            <div className="comment-count">
              <svg className="icon icon-comment" viewBox="0 0 16.1 16.1">
                <polygon points="6.9,11.6 16.1,11.6 16.1,0 0,0 0,11.6 2.1,11.6 2.1,16.1 " />
              </svg>
              {data.comments_num}
            </div>
          </div>
        </div >
      </div>
    );
  }
}

export default BlogCard;
