import * as actions from '../actionsTypes';

import { getJsonFromStorage, createQuery } from 'utils/functions';
import { API_URL } from 'config';

const request = () => ({
  type: actions.POSTS_REQUEST,
});

const response = (data, pageCount) => ({
  type: actions.POSTS_RESPONSE,
  data,
  pageCount,
});

const fetchPosts = options => (dispatch) => {
  const token = getJsonFromStorage('id_token') || null;
  const config = { headers: {} };

  if (token) {
    config.headers.Authorization = `JWT ${token}`;
  }

  dispatch(request());

  return fetch(`${API_URL}posts/${createQuery(options)}`, config)
    .then(res => res.json())
    .then(result => dispatch(response(
      result.results,
      Math.ceil(result.count / 30)
    )));
};

export default fetchPosts;
