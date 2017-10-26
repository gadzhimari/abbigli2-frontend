import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';


import dateFormat from 'dateformat';
import { Share, Link, Like } from 'components';

import { THUMBS_URL } from 'config';

import { setLike } from 'actions/like';
import { stagedPopup } from 'ducks/Auth/authActions';

import './index.less';

const typesUrl = {
  1: 'post',
  3: 'event',
  4: 'blog',
};

class BlogCard extends Component {
  like = () => {
    const { isAuth, dispatch, data } = this.props;

    if (!isAuth) {
      dispatch(stagedPopup('register'));

      return false;
    }

    dispatch(setLike(data.slug));

    return true;
  };

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
          <Like
            liked={data.liked}
            onClick={this.like}
          />
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
            <svg className="icon icon-blog" viewBox="0 0 51 52.7">
              <path d="M51,9.4L41.5,0L31,10.4H4.1c-2.3,0-4.1,1.8-4.1,4.1v27.8c0,2.3,1.8,4.1,4.1,4.1h1.4l0.7,6.3 l8.3-6.3H38c2.3,0,4.1-1.8,4.1-4.1V18.1L51,9.4z M16.2,34.4l1-6.3l5.3,5.4L16.2,34.4z M47.2,9.4L24,32.2l-5.6-5.6l23-22.8L47.2,9.4z "/>
            </svg>
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

BlogCard.propTypes = {
  data: PropTypes.shape({
    title: PropTypes.string,
    slug: PropTypes.string,
    price: PropTypes.number,
    user: PropTypes.object,
    images: PropTypes.array,
  }).isRequired,
  isAuth: PropTypes.bool.isRequired,
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  isAuth: state.Auth.isAuthenticated,
});

export default connect(mapStateToProps)(BlogCard);
