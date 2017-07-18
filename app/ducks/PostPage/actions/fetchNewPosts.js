import { API_URL } from 'config';
import * as actions from '../actionTypes';

import { createQuery } from 'utils/functions';

const request = () => ({
  type: actions.REQUEST_NEW,
});

const response = newPosts => ({
  type: actions.RESPONSE_NEW,
  newPosts,
});

const fetchNew = options => (dispatch) => {
  dispatch(request());

  return fetch(`${API_URL}posts/${createQuery(options)}`)
    .then(res => res.json())
    .then(data => dispatch(response(data.results)));
};

export default fetchNew;
