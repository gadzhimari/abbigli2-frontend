import { createActions } from 'redux-actions';
import { Products, Posts, Events } from '../../../api';

import { PRODUCT_TYPE, BLOG_TYPE, EVENT_TYPE } from '../../../lib/constants/posts-types';

const actionsByType = {
  [PRODUCT_TYPE]: Products.getProducts,
  [BLOG_TYPE]: Posts.getPosts,
  [EVENT_TYPE]: Events.getEvents
};

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

export default function loadPosts(options, type) {
  const { page = 1, author } = options;
  const action = actionsByType[type];

  const [requestAction, responseAction] = page === 1 ?
    [requestPosts, setPosts] :
    [requestMorePosts, setMorePosts];

  return (dispatch) => {
    dispatch(requestAction());

    return action({ page, author })
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
