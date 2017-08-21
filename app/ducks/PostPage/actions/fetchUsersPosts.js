import { API_URL } from 'config';
import * as actions from '../actionTypes';

const requestPost = () => ({
  type: actions.REQUEST_USER_POST,
});

const responsePost = usersPosts => ({
  type: actions.RESPONSE_USER_POST,
  usersPosts,
});

const fetchUsersPosts = (type, userID) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  return (dispatch) => {
    dispatch(requestPost());

    return fetch(`${API_URL}profiles/${userID}/posts/?type=${type}`, config)
      .then((res) => {
        if (res.ok) {
          return res.json();
        }

        throw new Error(res.status);
      })
      .then((responseData) => {
        if (responseData) {
          dispatch(responsePost(responseData.results));
        }
      });
  };
};

export default fetchUsersPosts;
