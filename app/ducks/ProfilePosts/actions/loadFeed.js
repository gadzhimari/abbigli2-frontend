import { Profile } from '../../../api';

import {
  setPosts,
  requestPosts,
  setPrivateStatus
} from './loadPosts';

export default function loadFeed(options) {
  const { page = 1 } = options;
  const params = { page };

  return (dispatch) => {
    dispatch(requestPosts());

    return Profile.getFeed(params)
      .then(({ data }) => {
        dispatch(setPosts(data));
      })
      .catch((err) => {
        if (err.status === 403) {
          setPrivateStatus(true);
        }
      });
  };
}
