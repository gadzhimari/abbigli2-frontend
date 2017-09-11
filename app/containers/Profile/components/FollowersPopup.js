import PropTypes from 'prop-types';
import React from 'react';

import MyFollowers from './MyFollowers';
import UserFollowers from './UserFollowers';

const FollowersPopup = (props) => {
  const {
    isMe,
    followers,
    following,
    showSubscribersFollowing,
    hideFollowers,
    showFollowing,
  } = props;
  return (<div>
    {
      isMe
        ? <MyFollowers
          followers={followers}
          following={following}
          showSubscribersFollowing={showSubscribersFollowing}
          hideFollowers={hideFollowers}
          showFollowing={showFollowing}
        />
        : <UserFollowers
          followers={followers}
          hideFollowers={hideFollowers}
        />
    }
  </div>);
};

export default FollowersPopup;
