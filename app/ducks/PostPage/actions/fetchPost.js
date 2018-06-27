import { createActions } from 'redux-actions';
import { Posts, Products, Events } from '../../../api';

import { setNetworkError } from '../../NetworkErrors/reducer';

const actionsByType = {
  post: Posts.getPost,
  product: Products.getProduct,
  event: Events.getEvent
};

export const {
  postRequest,
  postResponse,
  postFailure
} = createActions(
  'POST_REQUEST',
  'POST_RESPONSE',
  'POST_FAILURE'
);

const fetchPost = (postType, slug, token) => async (dispatch) => {
  dispatch(postRequest());
  const action = actionsByType[postType];

  try {
    const res = await action(slug, token);
    dispatch(postResponse(res.data));
  } catch ({ response }) {
    dispatch(setNetworkError(response));
  }
};

export default fetchPost;
