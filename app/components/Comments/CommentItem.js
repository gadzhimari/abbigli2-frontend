import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { Link } from 'react-router';
import { pure } from 'recompose';

import { location, THUMBS_URL } from 'config';

const CommentItem = ({ data }) => (
  <div className="comment">
    <div className="comment__user">
      <Link
        className="avatar"
        to={`/profile/${data.user.id}`}
      >
        {
          data.user.avatar
            ? <img className="avatar__img" src={`${THUMBS_URL}unsafe/113x113/${data.user.avatar}`} alt={data.user.profile_name} />
            : <img className="avatar__img" src="/images/svg/avatar.svg" alt={data.user.profile_name} />
        }
      </Link>
      <div className="comment__date">
        {
          moment(data.created)
            .locale(location)
            .format('LLL')
        }
      </div>
      <Link
        className="comment__author"
        to={`/profile/${data.user.id}`}
      >
        {data.user.profile_name}
      </Link>
    </div>
    <div className="comment__text">
      {data.comment}
    </div>
  </div>
);

CommentItem.propTypes = {
  data: PropTypes.shape({
    comment: PropTypes.string,
    created: PropTypes.string,
    user: PropTypes.object,
  }).isRequired,
};

export default pure(CommentItem);
