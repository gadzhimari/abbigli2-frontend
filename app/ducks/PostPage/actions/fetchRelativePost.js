import { Posts } from 'API';
import * as actions from '../actionTypes';

const request = () => ({
  type: actions.REQUEST_RELATIVE,
});

const response = relativePosts => ({
  type: actions.RESPONSE_RELATIVE,
  relativePosts,
});

const fetchRelative = slug => (dispatch) => {
  dispatch(request());

  return Posts.getSimilarPosts(slug)
    .then(res => dispatch(response(res.data.results)));
};

export default fetchRelative;
