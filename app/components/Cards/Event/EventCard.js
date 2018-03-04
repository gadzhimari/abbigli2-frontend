import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { Share, Image, Avatar } from '../../../components';
import { Like } from '../../../components-lib';
import Link from '../../Link/Link';

import createPostLink from '../../../lib/links/post-link';
import createProfileLink from '../../../lib/links/profile-link';
import toLocaleDateString from '../../../lib/date/toLocaleDateString';
import { EVENT_DATE_FORMAT } from '../../../lib/date/formats';

import setLike from '../../../ducks/Like/actions';

import './index.less';

class EventCard extends PureComponent {
  static propTypes = {
    data: PropTypes.shape({
      title: PropTypes.string,
      slug: PropTypes.string,
      price: PropTypes.number,
      user: PropTypes.object,
      images: PropTypes.array,
    }).isRequired,
  };

  like = () => setLike(this.props.data.slug);

  render() {
    const { data } = this.props;
    const imageUrl = data.images && data.images[0] && data.images[0].file;
    return (
      <div className="event-card">
        <div className="event-card__img-wrap">
          <Link
            to={createPostLink(data)}
          >
            <Image
              className="blog-card__img"
              alt={data.title}
              thumbSize="360x250"
              src={imageUrl}
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
                postLink={createPostLink(data)}
                buttonClass="social-btn"
                media={imageUrl}
                description={data.title}
              />
            </div>
          </div >
        </div>
        <div className="event-card__info">
          <Link
            className="event-card__title"
            to={createPostLink(data)}
          >
            <svg className="icon icon-event" viewBox="0 0 27 26">
              <path d="M22.2,3v2.1c0,2-1.6,3.5-3.5,3.5S15.1,7,15.1,5.1V3h-2.9v2.1c0,2-1.6,3.5-3.5,3.5 S5.1,7,5.1,5.1V3H0V26h27V3H22.2z M8.8,22.8H4.2v-4h4.5V22.8z M8.8,15.7H4.2v-4h4.5V15.7z M15.8,22.8h-4.5v-4h4.5V22.8z M15.8,15.7 h-4.5v-4h4.5V15.7z M18.2,22.8v-4h4.5L18.2,22.8z M22.8,15.7h-4.5v-4h4.5V15.7z" />
              <path d="M8.6,6.9c1,0,1.8-0.8,1.8-1.8V1.8c0-1-0.8-1.8-1.8-1.8S6.8,0.8,6.8,1.8v3.3 C6.8,6.1,7.6,6.9,8.6,6.9z" />
              <path d="M18.6,6.9c1,0,1.8-0.8,1.8-1.8V1.8c0-1-0.8-1.8-1.8-1.8s-1.8,0.8-1.8,1.8v3.3 C16.8,6.1,17.6,6.9,18.6,6.9z" />
            </svg>
            {data.title}
          </Link>
          <div
            className="event-card__text"
            dangerouslySetInnerHTML={{ __html: data.seo_description }}
          />
          <div className="event-card__date">
            {
              toLocaleDateString(data.date_start, EVENT_DATE_FORMAT)
            }
            { data.date_end ? ` - ${toLocaleDateString(data.data_end, EVENT_DATE_FORMAT)}` : ''}
            <div className="event-card__city">
              {data.city && data.city.name}
            </div>
          </div>
          <Link
            className="user"
            to={createProfileLink(data.user)}
          >
            <Avatar
              className="avatar"
              imgClassName="avatar__img"
              avatar={data.user.avatar}
              thumbSize="36x36"
              alt={data.user.profile_name}
            />
            {data.user.profile_name}
          </Link>
        </div>
      </div >
    );
  }
}

const mapStateToProps = state => ({
  isAuth: state.Auth.isAuthenticated,
});

export default connect(mapStateToProps)(EventCard);

