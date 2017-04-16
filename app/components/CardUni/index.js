import React, { Component, PropTypes } from 'react';
import dateFormat from 'dateformat';
import { connect } from 'preact-redux';
import { Link } from 'react-router';

import {
  Share,
  Like,
  Subscription,
} from 'components';
import { setLike } from 'actions/like';

import './index.styl';

class CardUni extends Component {
  constructor(props) {
    super(props);
    this.state = {
      forced: {
        like: null,
      },
    };
  }

  render() {
    const {
      title,
      created,
      comments_num,
      likes_num,
      price,
      images,
      city,
      user,
      date_start,
      date_end,
      type,
      slug,
      liked
    } = this.props.item;

    const { dispatch, priceTemplate } = this.props;

    const types_url = {
      1: 'post',
      3: 'event',
      4: 'blog',
    };

    const type_icon = {
      1: 'bag',
      3: 'event',
      4: 'blog',
    };

    return (
      <div className="tile">
        {/*
          Hided for this relise
          <Subscription />
        */}
        <div
          className="tile__image-holder"
        >
          <Link to={`/${types_url[type]}/${slug}`}>
            {
              images[0]
              &&
              <img
                className="tile__image"
                src={'https://abbigli.com/thumbs/unsafe/282x203/' + images[0].file}
                alt={images[0].description}
              />
            }
          </Link>

          <Like
            liked={this.state.forced.like === null ? liked : this.state.forced.like}
            onClick={() => {
              this.setState({ forced: { like: (this.state.forced.like === null ? !liked : !this.state.forced.like) } });
              dispatch(setLike(slug));
            }}
          />

          <Share
            postLink={`/${types_url[type]}/${slug}`}
          />
        </div>
        <div className="tile__info">
          <Link
            to={`/${types_url[type]}/${slug}`}
            className="tile__title"
          >
            <div
              className={`tile__title-icon ${type_icon[type]}`}
            />
            {title}
          </Link>
          {
            (type === 3)
            &&
            <div
              className="tile__date"
            >
              {dateFormat(date_start, 'dd.mm.yy')}
              {date_end ? ' - ' + dateFormat(date_end, 'dd.mm.yy') : ''}
              <span className="tile__city">
                {
                  city
                  &&
                  city.name
                }
              </span>
            </div>
          }
          <Link
            to={`/profile/${user.id}`}
            className="tile__author"
          >
            {
              user.avatar
                ? <div className="tile__author-avatar">
                  <img
                    src={`https://abbigli.com/thumbs/unsafe/25x25/${user.avatar}`}
                    alt={user.profile_name}
                  />
                </div>
                : <div className="tile__author-avatar">
                  <img
                    src="/images/icons_with_bg/user_active.svg"
                    alt={user.profile_name}
                  />
                </div>
            }
            <div className="tile__author-name">
              {user.profile_name}
            </div>
          </Link>
          {
            (type === 4)
            &&
            <div className="tile__comment-count">
              <div className="icon"></div>
              {comments_num > 0 && comments_num}
            </div>
          }
          {
            price &&
            <div className="tile__price">
              {priceTemplate && priceTemplate.replace('?', price)}
            </div>
          }

        </div>
      </div>
    );
  }
}

export default connect()(CardUni);
