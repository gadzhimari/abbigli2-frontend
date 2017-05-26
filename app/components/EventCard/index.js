import React, { Component } from 'react';
import moment from 'moment';
import { CardUni } from 'components';

import {
  Link,
  Share,
} from 'components';
import { stagedPopup } from 'ducks/Auth/authActions';
import { setLike } from 'actions/like';

import './index.styl';

const typesUrl = {
  1: 'post',
  3: 'event',
  4: 'blog',
};


class EventCard extends Component {
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

    if (!legacy) return <CardUni item={data} />;

    const likeStatus = this.state.forced.like === null
      ? data.liked
      : this.state.forced.like;
    const likeCount = this.state.forced.count === null
      ? data.likes_num
      : this.state.forced.count;

    return (
      <div className="event-card">
        <Link
          className="event-card__content"
          to={`/${typesUrl[data.type]}/${data.slug}`}
        >
          <div className="share">
            <div className="share-button">
              <svg className="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 19.987 20">
                <path d="M16.313,12.711c-1.168,0-2.197,0.553-2.869,1.396l-6.239-3.164C7.287,10.641,7.346,10.33,7.346,10
                  c0-0.357-0.07-0.694-0.168-1.023l6.211-3.15c0.668,0.883,1.725,1.46,2.924,1.46c2.031,0,3.674-1.631,3.674-3.644S18.344,0,16.313,0
	c-2.027,0-3.672,1.631-3.672,3.644c0,0.329,0.059,0.642,0.141,0.945L6.547,7.754C5.873,6.909,4.842,6.356,3.674,6.356
	C1.643,6.356,0,7.988,0,10c0,2.012,1.643,3.644,3.674,3.644c1.199,0,2.254-0.579,2.926-1.463l6.209,3.149
	c-0.098,0.328-0.168,0.667-0.168,1.026c0,2.013,1.645,3.644,3.672,3.644c2.031,0,3.674-1.631,3.674-3.644
	C19.987,14.342,18.344,12.711,16.313,12.711z"/>
</svg>
            </div>
            <Share
              postLink={`/${typesUrl[data.type]}/${data.slug}`}
              buttonClass="share-button"
            />
          </div>
          <div className="event-card__img">
            {
              data.images[0]
              &&
              (<Link to={`/${typesUrl[data.type]}/${data.slug}`}>
                <img
                  className="card-img"
                  src={'/thumbs/unsafe/360x250/' + data.images[0].file}
                  alt={data.images[0].description}
                />
              </Link>)
            }
            <Link className="event-card__avatar" to={`/profile/${data.user.id}/`}>&gt;
              {
                data.user.avatar
                  ? <img src={data.user.avatar} />
                  : <img src="/images/svg/avatar.svg" />
              }
            </Link>
          </div>
          <div className="event-card__name">
            {data.title}
          </div>
          <div className="blog-card__text">
            <p>
              {
                data.content.length < 130
                  ? data.content.replace(/<(?:.|\n)*?>/gm, '')
                  : data.content.replace(/<(?:.|\n)*?>/gm, '').slice(0, 130) + '...'
              }
            </p>
          </div>
        </Link>
        <div className="like-comment">
          <div className="event-card__date" title={`${data.city && `, ${data.city.name}, ${data.city.country.name}`}`}>
            <svg className="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 36">
              <path d="M29,36H3c-1.657,0-3-1.344-3-3V7c0-1.656,1.343-3,3-3h1V0h4v4h16V0h4 v4h1c1.657,0,3,1.343,3,3v26C32,34.656,30.657,36,29,36z M29,14H3v19h26V14z M26,30h-8v-8h8V30z" />
            </svg>
            {
              data.date_start
              &&
              moment(data.date_start).format('DD.MM.YYYY')
            }
            {
              data.date_end
              &&
              <span>
                {' - '}
                {moment(data.date_end).format('DD.MM.YYYY')}
              </span>
            }
            {data.city && `, ${data.city.name}, ${data.city.country.name}`}
          </div>
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


export default EventCard;
