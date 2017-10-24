import React from 'react';
import { Link } from 'components';
import { DOMAIN_URL } from 'config';

const UserItem = ({
  item,
  onClick,
  searchString,
}) => {
  let formattedName = item.profile_name || `ID: ${item.id}`;

  if (searchString) {
    formattedName = formattedName
      .replace(searchString, `<strong>${searchString}</strong>`);
  }

  return (
    <Link
      className="mobile-search__people"
      to={`/profile/${item.id}`}
      onClick={onClick}
    >
      <div className="mobile-search__people-avatar">
        {
          item.avatar
            ? <img
              src={`${DOMAIN_URL}thumbs/unsafe/70x70/${item.avatar}`}
              alt={item.profile_name}
            />
            : <img
              src={'/images/svg/avatar.svg'}
              alt={item.profile_name}
            />
        }
      </div>
      <div
        className="mobile-search__people-name"
        dangerouslySetInnerHTML={{ __html: formattedName }}
      />
    </Link>
  );
};

export default UserItem;
