import * as actions from '../actionTypes';

import { Posts } from 'API';

const request = () => ({
  type: actions.REQUEST_NEW,
});

const response = newPosts => ({
  type: actions.RESPONSE_NEW,
  newPosts,
});

const fetchNew = options => (dispatch) => {
  dispatch(request());

  return Posts.getPosts(options)
    .then(res => dispatch(response(res.data.results)));
};

export default fetchNew;
