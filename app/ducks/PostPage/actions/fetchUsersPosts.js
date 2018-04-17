import { createActions } from 'redux-actions';
import { Posts, Products, Events } from '../../../api';

const actionsByType = {
  post: Posts.getPosts,
  product: Products.getProducts,
  event: Events.getEvents
};

export const {
  requestUsersPosts,
  responseUsersPosts,
  failureUsersPosts
} = createActions(
  'REQUEST_USERS_POSTS',
  'RESPONSE_USERS_POSTS',
  'FAILURE_USERS_POSTS'
);

const fetchUsersPosts = (postType, authorID) => async (dispatch) => {
  dispatch(requestUsersPosts());

  const action = actionsByType[postType];

  try {
    const res = await action({ author: authorID });
    dispatch(responseUsersPosts(res.data.results));
  } catch (e) {
    dispatch(failureUsersPosts());
  }
};

export default fetchUsersPosts;
