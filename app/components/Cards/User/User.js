import React from 'react';
import PropTypes from 'prop-types';

import { pure } from 'recompose';

import { DOMAIN_URL } from 'config';
import { __t } from '../../../i18n/translator';

import './User.less';

const User = ({ user }) => {
  return (
    <div className="user-card">
      <div className="user-card__avatar">
        {
          user.avatar
            ? <img
              className="user-card__avatar-img"
              src={`${DOMAIN_URL}thumbs/unsafe/86x86/${user.avatar}`}
              alt={user.profile_name}
            />
            : <img
              className="user-card__avatar-img"
              src={'/images/svg/avatar.svg'}
              alt={user.profile_name}
            />
        }
      </div>
      <div className="user-card__name">{user.profile_name}</div>
      {
        user.city
        &&
        <div className="user-card__city">
          {user.city.name}
          {', '}
          {user.city.country.name}
        </div>
      }
      <button className="default-button" type="button">
        <svg className="icon icon-add" viewBox="0 0 22 22">
          <path d="M19.9,13.1h-6.9v6.9c0,1.1-0.9,2.1-2.1,2.1s-2.1-0.9-2.1-2.1v-6.9H2.1C0.9,13.1,0,12.1,0,11 c0-1.1,0.9-2.1,2.1-2.1h6.9V2.1C8.9,0.9,9.9,0,11,0s2.1,0.9,2.1,2.1v6.9h6.9c1.1,0,2.1,0.9,2.1,2.1C22,12.1,21.1,13.1,19.9,13.1z" />
        </svg>
        {'+ '}
        {__t('Subscribe')}
      </button>
    </div >
  );
};

export default pure(User);
