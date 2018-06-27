import { Posts, Products, Events } from '../../../api';
import * as actions from '../actionTypes';

import { setNetworkError } from '../../NetworkErrors/reducer';

import { PRODUCT_TYPE, BLOG_TYPE, EVENT_TYPE } from '../../../lib/constants/posts-types';
import preparePostForEditing from '../../../lib/adapters/prepare-post-for-editing';

const actionByType = {
  [PRODUCT_TYPE]: Products.getProduct,
  [BLOG_TYPE]: Posts.getPost,
  [EVENT_TYPE]: Events.getEvent
};

const fetchPostReq = () => ({
  type: actions.LOAD_POST_REQ,
});

const fetchPostRes = data => ({
  type: actions.LOAD_POST_RES,
  data,
});

const fetchPost = (slug, type) => (dispatch) => {
  dispatch(fetchPostReq);
  const action = actionByType[type];

  return action(slug)
    .then(({ data }) => {
      dispatch(fetchPostRes(preparePostForEditing(data)));
    })
    .catch((err) => {
      if (err.response) {
        dispatch(setNetworkError(err.response));
      }
      console.error(err);
    });
};

export default fetchPost;
