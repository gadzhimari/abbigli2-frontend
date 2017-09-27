import React from 'react';

import { Link } from 'components';
import { THUMBS_URL } from 'config';

const Recipient = ({
  data,
  closePopup,
}) => (
    <Link
      className="recipient"
      to={`/profile/${data.id}`}
      onClick={closePopup}
    >
      <div className="mobile-search__people-avatar">
        {
          data.avatar
            ? <img
              src={`${THUMBS_URL}unsafe/70x70/${data.avatar}`}
              alt={data.name || data.profile_name || `User id: ${data.id}`}
            />
            : <img
              src={'/images/svg/avatar.svg'}
              alt={data.name || data.profile_name || `User id: ${data.id}`}
            />
        }
      </div>
      <div className="recipient__info">
        <div
          className="recipient__name"
        >
          {data.name || data.profile_name || `User id: ${data.id}`}
        </div>
        <div className="mobile-search__people-city recipient__city">
          {(data.city && data.city.name)}
        </div>
      </div>
    </Link>);

export default Recipient;
