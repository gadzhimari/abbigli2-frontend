import { createActions } from 'redux-actions';

import { Posts, Products, Events } from '../../../api';

const actionsByType = {
  post: Posts.getPosts,
  product: Products.getProducts,
  event: Events.getEvents
};

export const {
  requestNewPosts,
  responseNewPosts,
  failureNewPosts
} = createActions(
  'REQUEST_NEW_POSTS',
  'RESPONSE_NEW_POSTS',
  'FAILURE_NEW_POSTS'
);

const fetchNew = postType => async (dispatch) => {
  dispatch(requestNewPosts());
  const action = actionsByType[postType];

  try {
    const res = await action();

    dispatch(responseNewPosts(res.data.results));
  } catch (e) {
    dispatch(failureNewPosts());
  }
};

export default fetchNew;
