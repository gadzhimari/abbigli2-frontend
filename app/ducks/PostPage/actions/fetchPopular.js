import { API_URL } from 'config';
import * as actions from '../actionTypes';

const request = () => ({
  type: actions.REQUEST_POPULAR,
});

const response = popularPosts => ({
  type: actions.RESPONSE_POPULAR,
  popularPosts,
});

const fetchPopular = type => (dispatch) => {
  dispatch(request);

  return fetch(`${API_URL}posts/?type=${type}&popular=true`)
    .then(res => res.json())
    .then(data => dispatch(response(data.results)));
};

export default fetchPopular;
