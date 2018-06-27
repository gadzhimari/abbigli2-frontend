import { createActions } from 'redux-actions';
import { Posts, Products, Events } from '../../../api';

const actionsByType = {
  post: Posts.getPosts,
  product: Products.getProducts,
  event: Events.getEvents
};

export const {
  requestPopularPosts,
  responsePopularPosts,
  failurePopularPosts
} = createActions(
  'REQUEST_POPULAR_POSTS',
  'RESPONSE_POPULAR_POSTS',
  'FAILURE_POPULAR_POSTS'
);

const fetchPopular = postType => async (dispatch) => {
  dispatch(requestPopularPosts());

  const action = actionsByType[postType];

  try {
    const res = await action({ popular: 'month' });
    dispatch(responsePopularPosts(res.data.results));
  } catch (e) {
    dispatch(failurePopularPosts());
  }
};

export default fetchPopular;
