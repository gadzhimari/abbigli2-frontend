import * as actions from '../actionsTypes';

import { Posts, Products, Events } from '../../../api';
import { PRODUCT_TYPE, BLOG_TYPE, EVENT_TYPE } from '../../../lib/constants/posts-types';

const actionByType = {
  [PRODUCT_TYPE]: Products.getProducts,
  [BLOG_TYPE]: Posts.getPosts,
  [EVENT_TYPE]: Events.getEvents
};

const request = () => ({
  type: actions.POSTS_REQUEST,
});

const response = data => ({
  type: actions.POSTS_RESPONSE,
  data,
});

const fetchPosts = (options, type = PRODUCT_TYPE) => (dispatch) => {
  dispatch(request());
  const action = actionByType[type];

  return action(options)
    .then(res => dispatch(response(res.data)));
};

export default fetchPosts;
