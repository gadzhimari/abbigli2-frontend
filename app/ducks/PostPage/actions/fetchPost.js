import { API_URL } from 'config';
import { getJsonFromStorage } from 'utils/functions';
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

const fetchPost = (slug, type, tokenID) => {
  const token = tokenID || getJsonFromStorage('id_token');
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  if (token) {
    config.headers.Authorization = `JWT ${token}`;
  }

  return (dispatch) => {
    dispatch(requestPost());

    return fetch(`${API_URL}posts/${slug}/`)
      .then((res) => {
        if (res.ok) {
          return res.json();
        }

        throw new Error(res.status);
      })
      .then((responseData) => {
        if (responseData) {
          dispatch(responsePost(responseData));
        }
      })
      .catch((error) => {
        if (error.message === '404') {
          dispatch(setNotFound());
        }
      });
  };
};

export default fetchPost;
