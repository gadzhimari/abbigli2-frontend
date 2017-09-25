import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { pure } from 'recompose';
import { Share, Like } from 'components';

import moment from 'moment';

import { THUMBS_URL } from 'config';

import { setLike } from 'actions/like';
import { stagedPopup } from 'ducks/Auth/authActions';

import './index.less';

const EventCard = ({ data, isAuth, dispatch }) => {
  const like = () => {
    if (!isAuth) {
      dispatch(stagedPopup('register'));

      return false;
    }

    dispatch(setLike(data.slug));

    return true;
  };

  return (
    <div className="event-card">
      <div className="event-card__img-wrap">
        <Link
          to={`/event/${data.slug}`}
        >
          <img
            className="blog-card__img"
            src={`${THUMBS_URL}unsafe/360x250/${data.images[0].file}`}
            alt={data.title}
          />
        </Link>
        <Like
          liked={data.liked}
          onClick={like}
        />
        <div className="share">
          <div className="share__icon" />
          <div className="dropdown-corner" />
          <div className="dropdown">
            <Share
              postLink={`/event/${data.slug}`}
              buttonClass="social-btn"
            />
          </div>
        </div >
      </div>
      <div className="event-card__info">
        <Link
          className="event-card__title"
          to={`/event/${data.slug}`}
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
            moment(data.date_start)
              .format('DD.MM.YYYY')
          }
          {
            data.date_end
            &&
            ` - ${moment(data.date_end).format('DD.MM.YYYY')}`
          }
          <div className="event-card__city">
            {data.city && data.city.name}
          </div>
        </div>
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
      </div>
    </div >
  );
};

EventCard.propTypes = {
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

export default connect(mapStateToProps)(pure(EventCard));

