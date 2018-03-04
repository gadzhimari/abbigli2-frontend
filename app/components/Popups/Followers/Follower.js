import React from 'react';

import Link from '../../Link/Link';

import { THUMBS_URL } from 'config';

const Follower = ({ item, onClick }) => (
  <Link
    key={item.id}
    className="popup-subscriber"
    to={`/profile/${item.id}`}
    title={item.profile_name}
    onClick={onClick}
  >
    <div className="popup-subscriber__avatar">
      <img
        src={
          item.avatar
            ? `${THUMBS_URL}unsafe/60x60/${item.avatar}`
            : '/images/svg/avatar.svg'
        }
        alt={item.profile_name}
      />
    </div>
    <div
      className="popup-subscriber__name"
    >
      {
        item.profile_name || `ID ${item.id}`
      }
    </div>
  </Link>
);

export default Follower;
