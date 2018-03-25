import { createAction } from 'redux-actions';
import { Posts, Products, Events } from '../../api';
import onlyAuthAction from '../../lib/redux/onlyAuthAction';

import { PRODUCT_TYPE, BLOG_TYPE, EVENT_TYPE } from '../../lib/constants/posts-types';

const setLikeRequest = createAction('LIKE_SET_REQUEST');
const setLikeSuccess = createAction('LIKE_SET_SUCCESS');
const setLikeFailure = createAction('LIKE_SET_FAILED');

const apiByType = {
  [PRODUCT_TYPE]: Products,
  [BLOG_TYPE]: Posts,
  [EVENT_TYPE]: Events
};

const setLike = (slug, type) => async (dispatch) => {
  dispatch(setLikeRequest());
  const api = apiByType[type];

  try {
    await api.like(slug);
    dispatch(setLikeSuccess());
  } catch (e) {
    dispatch(setLikeFailure());
  }
};

export default onlyAuthAction(setLike);
