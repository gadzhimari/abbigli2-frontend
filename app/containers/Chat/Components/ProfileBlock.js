import React from 'react';
import PropTypes from 'prop-types';

import Link from '../../../components/Link/Link';

import { __t } from '../../../i18n/translator';
import Avatar from './Avatar';

const ProfileBlock = ({
  user,
}) => (
    <div className="messages__profile">
      <Link
        className="messages__back"
        to={`/profile/${user.id}`}
      >
        <svg className="icon icon-arrow" viewBox="0 0 11.3 19.6">
          <path d="M0.7,0.6c-0.8,0.8-0.9,2.1-0.1,2.9l5.9,6.4l-5.9,6.3c-0.8,0.9-0.8,2.2,0.1,2.9 c0.9,0.7,2.1,0.7,2.9-0.1l7.2-7.8c0.1-0.1,0.1-0.1,0.2-0.2l0,0c0.1-0.1,0.1-0.2,0.2-0.3l0,0c0-0.1,0.1-0.2,0.1-0.3v-0.1 c0-0.1,0-0.2,0-0.2c0-0.1,0-0.1,0-0.2c0-0.1,0-0.1,0-0.2c0-0.1,0-0.2,0-0.2V9.4c0-0.1-0.1-0.2-0.1-0.3l0,0C11.1,9,11.1,8.9,11,8.8 l0,0c-0.1-0.1-0.1-0.2-0.2-0.2L3.6,0.7C2.8-0.2,1.5-0.2,0.7,0.6z" />
        </svg>
      </Link>
      <Link
        className="messages__profile-name"
        to={`/profile/${user.id}`}
      >
        <Avatar
          avatar={user.avatar}
          alt={user.profile_name || __t('Your profile')}
        />
        {user.profile_name || __t('Your profile')}
      </Link>
      <div className="messages__profile-icons">
        <Link
          to={`/profile/${user.id}/feed`}
        >
          <svg className="icon icon-feed" viewBox="0 0 24.1 23.8">
            <rect x="0" y="0" width="10" height="11.7" />
            <rect x="0" y="16.3" width="10" height="7.6" />
            <rect x="14.1" y="12.1" width="10" height="11.7" />
            <rect x="14.1" y="0" width="10" height="7.6" />
          </svg>
        </Link>
        <Link
          to={`/profile/${user.id}/favorites`}
        >
          <svg className="icon icon-like" viewBox="0 0 20.1 18">
            <path d="M10.1,3.2C10.9,1.3,12.8,0,14.9,0c2.9,0,5,2.4,5.2,5.3c0,0,0.1,0.7-0.2,2c-0.4,1.8-1.4,3.3-2.8,4.5L10,18 l-7-6.2c-1.3-1.2-2.3-2.7-2.8-4.5C-0.1,6,0,5.3,0,5.3C0.3,2.4,2.3,0,5.2,0C7.5,0,9.3,1.3,10.1,3.2z" />
          </svg>
        </Link>
      </div >
    </div >
  );

ProfileBlock.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.number,
    avatar: PropTypes.any,
    profile_name: PropTypes.any,
  }).isRequired,
};

export default ProfileBlock;
