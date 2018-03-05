import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Link } from 'react-router';

import { Share } from '../../../components';
import { Like } from '../../../components-lib';
import Image from '../../../components/Image';
import setLike from '../../../ducks/Like/actions';
import Avatar from '../../Avatar';

import createPostLink from '../../../lib/links/post-link';
import createProfileLink from '../../../lib/links/profile-link';
import toLocaleDateString from '../../../lib/date/toLocaleDateString';
import { EVENT_DATE_FORMAT } from '../../../lib/date/formats';

import './index.styl';

class Uni extends Component {
  like = () => setLike(this.props.item.slug)

  render() {
    const {
      item: {
        title,
        comments_num: commentsCount,
        price,
        images,
        city,
        user,
        date_start,
        date_end: dateEnd,
        type,
        liked,
      },
      priceTemplate,
    } = this.props;

    const type_icon = {
      1: 'bag',
      3: 'event',
      4: 'blog',
    };
    const imageUrl = images && images[0] && images[0].file;

    return (
      <div className="tile">
        <div className="tile__image-holder">
          <Link to={createPostLink(this.props.item)}>
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
                postLink={createPostLink(this.props.item)}
                buttonClass="social-btn"
                media={imageUrl}
                description={title}
              />
            </div>
          </div>
        </div>
        <div className="tile__info">
          <Link
            to={createPostLink(this.props.item)}
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
              {toLocaleDateString(date_start, EVENT_DATE_FORMAT)}
              {dateEnd ? ` - ${toLocaleDateString(date_start, EVENT_DATE_FORMAT)}` : ''}
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
            to={createProfileLink(user)}
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
              <div className="icon" />
                { commentsCount > 0 && commentsCount }
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
