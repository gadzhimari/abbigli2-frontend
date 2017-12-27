import React, { Component } from 'react';
import Type from 'prop-types';
import { connect } from 'react-redux';

import dateFormat from 'dateformat';
import { Link } from 'react-router';

import { Share, Like } from '../../../components';
import Image from '../../../components/Image';
import setLike from '../../../ducks/Like/actions';
import Avatar from '../../Avatar';

import './index.styl';

class Uni extends Component {
  like = () => setLike(this.props.item.slug)

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
    const imageUrl = images && images[0] && images[0].file;

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
            <Image
              className="tile__image"
              alt={title}
              thumbSize="400x300"
              src={imageUrl}
            />
          </Link>

          <Like
            liked={liked}
            onClick={this.like}
          />
          <div className="share">
            <div className="share__icon" />
            <div className="dropdown-corner" />
            <div className="dropdown">
              <Share
                postLink={`/${types_url[type]}/${slug}`}
                buttonClass="social-btn"
              />
            </div>
          </div>
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
            <Avatar
              className="tile__author-avatar"
              avatar={user.avatar}
              thumbSize="25x25"
              alt={user.profile_name}
            />
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

export default connect()(Uni);
