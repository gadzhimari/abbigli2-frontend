import { API_URL } from 'config';
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

  return fetch(`${API_URL}posts/${slug}/similar/`)
    .then(res => res.json())
    .then(data => dispatch(response(data.results)));
};

export default fetchRelative;
