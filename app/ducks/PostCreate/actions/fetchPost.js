import { Posts } from '../../../api';
import * as actions from '../actionTypes';

import preparePostForEditing from '../../../lib/adapters/prepare-post-for-editing';

const fetchPostReq = () => ({
  type: actions.LOAD_POST_REQ,
});

const fetchPostRes = data => ({
  type: actions.LOAD_POST_RES,
  data,
});

// TODO: new api
const fetchPost = slug => (dispatch) => {
  dispatch(fetchPostReq);

  return Posts.getPost(slug)
    .then(({ data }) => {
      dispatch(fetchPostRes(preparePostForEditing(data)));
    });
};

export default fetchPost;
