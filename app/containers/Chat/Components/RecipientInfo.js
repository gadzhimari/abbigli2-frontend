import React from 'react';
import PropTypes from 'prop-types';

import Link from '../../../components/Link/Link';

import AvatarPost from './AvatarPost';
import Avatar from './Avatar';

const RecipientInfo = ({
  post,
  user,
  closeDialog,
}) => (
    <div className="messages__header">
      <a
        className="messages__back"
        onClick={closeDialog}
      >
        <svg className="icon icon-arrow" viewBox="0 0 11.3 19.6">
          <path d="M0.7,0.6c-0.8,0.8-0.9,2.1-0.1,2.9l5.9,6.4l-5.9,6.3c-0.8,0.9-0.8,2.2,0.1,2.9 c0.9,0.7,2.1,0.7,2.9-0.1l7.2-7.8c0.1-0.1,0.1-0.1,0.2-0.2l0,0c0.1-0.1,0.1-0.2,0.2-0.3l0,0c0-0.1,0.1-0.2,0.1-0.3v-0.1 c0-0.1,0-0.2,0-0.2c0-0.1,0-0.1,0-0.2c0-0.1,0-0.1,0-0.2c0-0.1,0-0.2,0-0.2V9.4c0-0.1-0.1-0.2-0.1-0.3l0,0C11.1,9,11.1,8.9,11,8.8 l0,0c-0.1-0.1-0.1-0.2-0.2-0.2L3.6,0.7C2.8-0.2,1.5-0.2,0.7,0.6z" />
        </svg>
      </a>
      <div className="dialog__avatar dialog__avatar_goods">
        {
          post
            ? <Link to={`/post/${post.slug}`}>
              <AvatarPost
                avatar={user.avatar}
                alt={user.profile_name || `User ID: ${user.id}`}
                postImg={post.image}
                postAlt={post.title}
              />
            </Link>
            : <Link to={`/profile/${user.id}`}>
              <Avatar
                avatar={user.avatar}
                alt={user.profile_name || `User ID: ${user.id}`}
              />
            </Link>
        }
      </div>
      <div className="dialog__author">
        {
          post
            ? <Link to={`/post/${post.slug}`}>{post.title}</Link>
            : <Link to={`/profile/${user.id}`}>{user.profile_name || `User ID: ${user.id}`}</Link>
        }
        {
          post
          &&
          <span className="dialog__price">
            {post.price}
          </span>
        }
      </div>
      <div className="dialog__preview">
        {
          post
          &&
          (user.profile_name || `User ID: ${user.id}`)
        }
      </div>
    </div>
  );

RecipientInfo.defaultProps = {
  post: null,
};

RecipientInfo.propTypes = {
  closeDialog: PropTypes.func.isRequired,
  post: PropTypes.shape({
    price: PropTypes.number,
    slug: PropTypes.string,
    image: PropTypes.string,
    title: PropTypes.string,
  }),
  user: PropTypes.shape({
    avatar: PropTypes.string,
    profile_name: PropTypes.string,
    id: PropTypes.number,
  }).isRequired,
};

export default RecipientInfo;
