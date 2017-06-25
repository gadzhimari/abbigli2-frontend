import React from 'react';

import { Link } from 'components';
import { DOMAIN_URL } from 'config';

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
              src={`${DOMAIN_URL}thumbs/unsafe/70x70/${data.avatar}`}
              alt={data.name}
            />
            : <img
              src={'/images/svg/avatar.svg'}
              alt={data.name}
            />
        }
      </div>
      <div
        className="recipient__name"
      >
        {data.name}
      </div>
      <div className="mobile-search__people-city">
        {(data.city && data.city.name)}
      </div>
    </Link>);

export default Recipient;
