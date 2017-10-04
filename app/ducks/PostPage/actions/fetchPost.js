import { Posts } from 'API';
import * as actions from '../actionTypes';

const requestPost = () => ({
  type: actions.REQUEST_POST,
});

const responsePost = post => ({
  type: actions.RESPONSE_POST,
  post,
});

const setNotFound = () => ({
  type: actions.ERROR_404,
});

const fetchPost = (slug, token) => (dispatch) => {
  dispatch(requestPost());

  return Posts.getPost(slug, token)
    .then((response) => {
      dispatch(responsePost(response.data));
    })
    .catch(() => {
      dispatch(setNotFound());
    });
};

export default fetchPost;
