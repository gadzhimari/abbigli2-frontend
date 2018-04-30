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
  requestPosts,
  setPrivateStatus
} = createActions(
  'SET_POSTS',
  'REQUEST_POSTS',
  'SET_PRIVATE_STATUS'
);

export default function loadPosts(options, type) {
  const { page = 1, author } = options;
  const action = actionsByType[type];

  return (dispatch) => {
    dispatch(requestPosts());

    return action({ page, author })
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
