import React, { Component, PropTypes } from 'react';
import dateFormat from 'dateformat';
import { CardUni, Share } from 'components';

import {
  Link,
} from 'components';
import { stagedPopup } from 'ducks/Auth/authActions';
import { setLike } from 'actions/like';
import { DOMAIN_URL } from 'config';

import './index.styl';

const typesUrl = {
  1: 'post',
  3: 'event',
  4: 'blog',
};

class BlogCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      forced: {
        like: null,
        count: null,
      },
    };
  }

  toggleLike = () => {
    const { dispatch, isAuthenticated, data } = this.props;
    const { liked, slug, likes_num } = data;

    if (!isAuthenticated) {
      dispatch(stagedPopup('register'));

      return;
    }

    const newLiked = this.state.forced.like === null
      ? !liked
      : !this.state.forced.like;
    let count = this.state.forced.count === null
      ? likes_num
      : this.state.forced.count;

    const newCount = newLiked
      ? ++count
      : --count;

    this.setState({
      forced: {
        like: newLiked,
        count: newCount,
      },
    });

    dispatch(setLike(slug));
  }

  render() {
    const { data, legacy } = this.props;

    if (!legacy) {
      return <CardUni item={data} />;
    }

    const likeStatus = this.state.forced.like === null
      ? data.liked
      : this.state.forced.like;
    const likeCount = this.state.forced.count === null
      ? data.likes_num
      : this.state.forced.count;

    return (
      <div className="blog-card">
        <Link className="blog-card__content" to={`/${typesUrl[data.type]}/${data.slug}`}>
          <div className="share">
            <div className="share-button">
              <svg className="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 19.987 20">
                <path d="M16.313,12.711c-1.168,0-2.197,0.553-2.869,1.396l-6.239-3.164C7.287,10.641,7.346,10.33,7.346,10
                  c0-0.357-0.07-0.694-0.168-1.023l6.211-3.15c0.668,0.883,1.725,1.46,2.924,1.46c2.031,0,3.674-1.631,3.674-3.644S18.344,0,16.313,0
	                    c-2.027,0-3.672,1.631-3.672,3.644c0,0.329,0.059,0.642,0.141,0.945L6.547,7.754C5.873,6.909,4.842,6.356,3.674,6.356
	                    C1.643,6.356,0,7.988,0,10c0,2.012,1.643,3.644,3.674,3.644c1.199,0,2.254-0.579,2.926-1.463l6.209,3.149
	                    c-0.098,0.328-0.168,0.667-0.168,1.026c0,2.013,1.645,3.644,3.672,3.644c2.031,0,3.674-1.631,3.674-3.644
	                    C19.987,14.342,18.344,12.711,16.313,12.711"
                    />
                  </svg>
            </div>
            <Share
              postLink={`/${typesUrl[data.type]}/${data.slug}`}
              buttonClass="share-button"
            />
          </div>
          <div className="blog-card__img">
            {
              data.images && data.images[0]
              &&
              <img
                className="card-img"
                src={`${DOMAIN_URL}thumbs/unsafe/360x250/${data.images[0].file}`}
                alt={data.title}
              />
            }
            <Link className="blog-card__avatar" to={`/profile/${data.user.id}`}>
              {
                data.user.avatar
                  ? <img
                    src={`${DOMAIN_URL}thumbs/unsafe/36x36/${data.user.avatar}`}
                    alt={data.user.profile_name}
                  />
                  : <img
                    src={'/images/svg/avatar.svg'}
                    alt={data.user.profile_name}
                  />
              }
            </Link>
          </div>
          <div className="blog-card__name">{data.title}</div>
          <div className="blog-card__text">
            <p
              dangerouslySetInnerHTML={{ __html: data.seo_description }}
            />
          </div>
        </Link>
        <div className="like-comment">
          <div className="blog-card__date">{dateFormat(data.created, 'd mmmm yyyy')}</div>
          <div
            className="like-comment__button likes"
            onClick={this.toggleLike}
          >
            <div className="icon-wrap">
              <svg
                xmlns="http://www.w3.org/2000/svg" viewBox="0 0 34 31.193"
                className={`icon ${likeStatus ? 'liked' : ''}`}
              >
                <path d="M17,31.193l-2.467-2.242C5.778,21.011,0,15.774,0,9.35C0,4.113,4.113,0,9.351,0C12.308,0,15.147,1.377,17,3.552
                  C18.853,1.377,21.691,0,24.649,0C29.886,0,34,4.113,34,9.35c0,6.425-5.781,11.661-14.537,19.618L17,31.193z"/>
                </svg>
            </div>
            {likeCount}
          </div>
          <div className="like-comment__button message">
            <div className="icon-wrap">
              <svg className="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 12 12">
                <path d="M0,8V0.8C0,0.359,0.36,0,0.799,0h10.402C11.641,0,12,0.359,12,0.8V12L8.799,8.799h-8C0.36,8.799,0,8.44,0,8z" />
              </svg>
            </div>
            {data.comments_num}
          </div>
        </div>
      </div>
    );
  }
}

BlogCard.defaultProps = {
  data: {
    title: '',
    content: '',
    images: [],
    slug: '',
    user: {},
    created: null,
    comments_num: 0,
    likes_num: 0,
    type: 0,
  },
};

export default BlogCard;
