import { createActions } from 'redux-actions';
import { Profile } from '../../../api';

export const {
  setPosts,
  setMorePosts,
  requestPosts,
  requestMorePosts,
  setPrivateStatus
} = createActions(
  {
    SET_POSTS: (posts, next) => ({ posts, next }),
    SET_MORE_POSTS: (posts, next) => ({ posts, next }),
  },
  'REQUEST_POSTS',
  'REQUEST_MORE_POSTS',
  'SET_PRIVATE_STATUS'
);

export default function loadPosts(option) {
  const { type = 'posts', excludeId, page = 1, profileId } = option;
  const params = {
    exclude_id: excludeId,
    page
  };

  const [requestAction, responseAction] = page === 1 ?
    [requestPosts, setPosts] :
    [requestMorePosts, setMorePosts];

  return (dispatch) => {
    dispatch(requestAction());

    return Profile.getProfilePosts(profileId, type, params)
      .then(({ data }) => {
        dispatch(responseAction(data.results, data.next));
      })
      .catch((err) => {
        if (err.status === 403) {
          setPrivateStatus(true);
        }
      });
  };
}
