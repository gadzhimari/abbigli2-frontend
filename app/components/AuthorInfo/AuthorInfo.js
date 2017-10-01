import React from 'react';

import { Link } from 'react-router';
import { THUMBS_URL } from 'config';

import { setFollow } from 'ducks/PostPage/actions';

import { __t } from '../../i18n/translator';
import './AuthorInfo.less';

const AuthorInfo = ({
  data,
  dispatch,
  showSubscribeButton,
}) => {
  const subscribe = () => dispatch(setFollow(data.id));

  return (
    <div className="subscription-article__wrap">
      <Link
        className="subscription-article__avatar"
        to={`/profile/${data.id}`}
      >
        {
          data.avatar
            ? <img src={`${THUMBS_URL}unsafe/113x113/${data.avatar}`} alt={data.profile_name} />
            : <img src="/images/svg/avatar.svg" alt={data.profile_name} />
        }
      </Link>
      <div className="subscription-article__author">
        <Link
          className="subscription-article__author-name"
          to={`/profile/${data.id}`}
        >
          {
            data.profile_name
              ? data.profile_name
              : `User ID: ${data.id}`
          }
        </Link>
        <div className="subscription-article__author-city">
          <svg className="icon icon-pin" viewBox="40.3 168.9 14 20">
            <path d="M52.2,170.9c-1.3-1.3-3.1-2.1-5-2.1c-1.9,0-3.6,0.7-5,2.1c-2.4,2.4-2.8,7.1-0.7,9.8l5.6,8.1l5.6-8.1 C55,178,54.7,173.4,52.2,170.9z M47.3,178.4c-1.4,0-2.6-1.1-2.6-2.6s1.1-2.6,2.6-2.6c1.4,0,2.6,1.1,2.6,2.6S48.7,178.4,47.3,178.4z" />
          </svg>
          {
            data.city
              ? `${data.city.name}, ${data.city.country.name}`
              : 'Город не указан'
          }
        </div>
        <If condition={showSubscribeButton}>
          <button
            className="default-button"
            type="button"
            onClick={subscribe}
          >
            {
              data.is_subscribed
                ? __t('Unsubscribe')
                : __t('Subscribe')
            }
          </button>
        </If>
      </div>
    </div >
  );
};

export default AuthorInfo;
