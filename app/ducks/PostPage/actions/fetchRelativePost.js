import { createActions } from 'redux-actions';
import { Posts, Products, Events } from '../../../api';

const actionsByType = {
  post: Posts.getSimilarPosts,
  product: Products.getSimilarProducts,
  event: Events.getSimilarEvents
};

export const {
  requestRelativePosts,
  responseRelativePosts,
  failureRelativePosts
} = createActions(
  'REQUEST_RELATIVE_POSTS',
  'RESPONSE_RELATIVE_POSTS',
  'FAILURE_RELATIVE_POSTS'
);

const fetchRelative = (postType, slug) => async (dispatch) => {
  dispatch(requestRelativePosts());

  const action = actionsByType[postType];

  try {
    const res = await action(slug);
    dispatch(responseRelativePosts(res.data.results));
  } catch ({ response }) {
    dispatch(failureRelativePosts());
  }
};

export default fetchRelative;
