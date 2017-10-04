import { Posts } from 'API';
import * as actions from '../actionTypes';

const requestPost = () => ({
  type: actions.REQUEST_USER_POST,
});

const responsePost = usersPosts => ({
  type: actions.RESPONSE_USER_POST,
  usersPosts,
});

const fetchUsersPosts = (type, userID) => (dispatch) => {
  dispatch(requestPost());

  return Posts.getUsersPosts(userID, { type })
    .then((res) => {
      dispatch(responsePost(res.data.results));
    });
};

export default fetchUsersPosts;
