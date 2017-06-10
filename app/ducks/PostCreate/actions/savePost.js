import browserHistory from 'react-router/lib/browserHistory';

import { getJsonFromStorage } from 'utils/functions';
import { API_URL } from 'config';

import * as actions from '../actionTypes';

const savePostReq = () => ({
  type: actions.SAVE_POST_REQ,
});

const savePostRes = (errors = {}) => ({
  type: actions.SAVE_POST_RES,
  errors,
});

const savePost = (data, typesUrl, method, slug = '') => {
  const token = getJsonFromStorage('id_token');
  let config;

  if (token) {
    config = {
      method,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `JWT ${token}`,
      },
      body: JSON.stringify(data),
    };
  } else {
    return;
  }

  return (dispatch) => {
    dispatch(savePostReq());

    return fetch(`${API_URL}posts/${slug}`, config)
      .then(response => response.json())
      .then((result) => {
        if (result.id) {
          dispatch(savePostRes());
          browserHistory.push(`/${typesUrl[result.type]}/${result.slug}`);
        } else {
          dispatch(savePostRes(result));
        }
      });
  };
};

export default savePost;
