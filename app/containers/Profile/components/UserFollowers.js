import React, { PropTypes } from 'react';

import { Link } from 'components';

import { __t } from './../../../i18n/translator';

const UserFollowers = props => {
  const { followers, hideFollowers } = props;
  return (
    <div className="popup" id="followers_view">
      <svg
        className="popup-close icon"
        onClick={hideFollowers}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 14 14.031"
      >
        <path d="M14,1.414L12.59,0L7,5.602L1.41,0L0,1.414l5.589,5.602L0,12.618l1.41,1.413L7,8.428l5.59,5.604L14,12.618
	      L8.409,7.016L14,1.414z"/>
      </svg>


      <div className="popup-filter">
        <a className="popup-filter__link active">
          {__t('Followers')}&nbsp;
          ({followers.length})
          </a>
      </div>
      <div className="popup-subscribers">
        {
          followers.length > 0
            &&
          followers.map(item => (
            <Link
              key={item.id}
              className="popup-subscriber"
              to={`/profile/${item.id}`}
              title={item.profile_name}
            >
              <div className="popup-subscriber__avatar">
                {
                  item.avatar
                    ? <img
                      src={`/thumbs/unsafe/60x60/${item.avatar}`}
                      alt={item.profile_name}
                    />
                    : <img
                      src="/images/svg/avatar.svg"
                      alt={item.profile_name}
                    />
                }
              </div>
              <div
                className="popup-subscriber__name"
              >
                {
                  item.profile_name
                    ? item.profile_name
                    : `ID ${item.id}`
                }
              </div>
            </Link>
          ))

        }
        {
          followers.length === 0
          &&
          __t('Not followers yet')
        }
      </div>
    </div>
  );
};

export default UserFollowers;
