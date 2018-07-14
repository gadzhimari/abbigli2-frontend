import { createActions } from 'redux-actions';
import { Posts, Products, Events } from '../../../api';

const actionsByType = {
  post: Posts.getSimilarPosts,
  product: Products.getSimilarProducts,
  event: Events.getSimilarEvents
};

export const {
  requestSimilarPosts,
  responseSimilarPosts,
  failureSimilarPosts
} = createActions(
  'REQUEST_SIMILAR_POSTS',
  'RESPONSE_SIMILAR_POSTS',
  'FAILURE_SIMILAR_POSTS'
);

const fetchSimilar = (postType, slug) => async (dispatch) => {
  dispatch(requestSimilarPosts());

  const action = actionsByType[postType];

  try {
    const res = await action(slug);
    dispatch(responseSimilarPosts(res.data.results));
  } catch ({ response }) {
    dispatch(failureSimilarPosts());
  }
};

export default fetchSimilar;
