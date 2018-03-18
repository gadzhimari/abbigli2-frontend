import React, { PureComponent } from 'react';
import { connect } from 'react-redux';

import { Share } from '../../../components';
import { Like } from '../../../components-lib';
import Image from '../../../components/Image';
import setLike from '../../../ducks/Like/actions';
import Avatar from '../../Avatar';
import Link from '../../Link/Link';

import createPostLink from '../../../lib/links/post-link';
import createProfileLink from '../../../lib/links/profile-link';
import toLocaleDateString from '../../../lib/date/toLocaleDateString';
import { EVENT_DATE_FORMAT } from '../../../lib/date/formats';

import './index.styl';

class Uni extends PureComponent {
  render() {
    const {
      item: {
        title,
        comments_num: commentsCount,
        price,
        image,
        city,
        author,
        date_start: dateStart,
        date_end: dateEnd,
        liked,
        slug
      },
      priceTemplate,
      setLike,
      type
    } = this.props;

    const typeIcon = {
      product: 'bag',
      event: 'event',
      post: 'blog',
    };

    return (
      <div className="tile">
        <div className="tile__image-holder">
          <Link to={createPostLink({ type, slug })}>
            <Image
              className="tile__image"
              alt={title}
              thumbSize="400x300"
              src={image}
            />
          </Link>

          <Like
            liked={liked}
            onClick={setLike}
            slug={slug}
          />
          <div className="share">
            <div className="share__icon" />
            <div className="dropdown-corner" />
            <div className="dropdown">
              <Share
                postLink={createPostLink({ type, slug })}
                buttonClass="social-btn"
                media={image}
                description={title}
              />
            </div>
          </div>
        </div>
        <div className="tile__info">
          <Link
            to={createPostLink({ type, slug })}
            className="tile__title"
          >
            <div
              className={`tile__title-icon ${typeIcon[type]}`}
            />
            {title}
          </Link>
          {
            (type === 'event')
            &&
            <div
              className="tile__date"
            >
              {toLocaleDateString(dateStart, EVENT_DATE_FORMAT)}
              {dateEnd ? ` - ${toLocaleDateString(dateEnd, EVENT_DATE_FORMAT)}` : ''}
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
            to={createProfileLink(author)}
            className="tile__author"
          >
            <Avatar
              className="tile__author-avatar"
              avatar={author.avatar}
              thumbSize="25x25"
              alt={author.profile_name}
            />
            <div className="tile__author-name">
              {author.profile_name}
            </div>
          </Link>
          {
            (type === 'post')
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

export default connect(() => ({}), { setLike })(Uni);
