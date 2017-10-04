import * as actions from '../actionsTypes';

import { Posts } from 'API';

const request = () => ({
  type: actions.POSTS_REQUEST,
});

const response = (data, pageCount) => ({
  type: actions.POSTS_RESPONSE,
  data,
  pageCount,
});

const fetchPosts = options => (dispatch) => {
  dispatch(request());

  return Posts.getPosts(options)
    .then(res =>
      dispatch(response(res.data.results, Math.ceil(res.data.count / 30))));
};

export default fetchPosts;
