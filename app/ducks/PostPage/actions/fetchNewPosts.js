import { API_URL } from 'config';
import * as actions from '../actionTypes';

const request = () => ({
  type: actions.REQUEST_NEW,
});

const response = newPosts => ({
  type: actions.RESPONSE_NEW,
  newPosts,
});

const fetchNew = type => (dispatch) => {
  dispatch(request());

  return fetch(`${API_URL}posts/?type=${type}`)
    .then(res => res.json())
    .then(data => dispatch(response(data.results)));
};

export default fetchNew;
