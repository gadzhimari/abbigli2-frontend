import { Posts } from '../../../api';
import * as actions from '../actionTypes';

import { setNetworkError } from '../../NetworkErrors/reducer';

const requestPost = () => ({
  type: actions.REQUEST_POST,
});

const responsePost = post => ({
  type: actions.RESPONSE_POST,
  post,
});

const fetchPost = (slug, token) => (dispatch) => {
  dispatch(requestPost());

  return Posts.getPost(slug, token)
    .then((response) => {
      dispatch(responsePost(response.data));
    })
    .catch(({ response }) => {
      dispatch(setNetworkError(response));
    });
};

export default fetchPost;
