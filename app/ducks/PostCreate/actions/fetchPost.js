import { Posts } from '../../../api';
import * as actions from '../actionTypes';

const fetchPostReq = () => ({
  type: actions.LOAD_POST_REQ,
});

const fetchPostRes = data => ({
  type: actions.LOAD_POST_RES,
  data,
});

const fetchPost = slug => (dispatch) => {
  dispatch(fetchPostReq);

  return Posts.getPost(slug)
    .then(({ data }) => {
      dispatch(fetchPostRes(data));
    });
};

export default fetchPost;
