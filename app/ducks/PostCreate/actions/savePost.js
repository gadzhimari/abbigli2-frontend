import browserHistory from 'react-router/lib/browserHistory';

import { Posts } from '../../../api';
import * as actions from '../actionTypes';

import createPostLink from '../../../lib/links/post-link';

const savePostReq = () => ({ type: actions.SAVE_POST_REQ });
const savePostRes = (errors = {}) => ({
  type: actions.SAVE_POST_RES,
  errors,
});

const savePost = (data, slug = null) => (dispatch) => {
  dispatch(savePostReq());

  const apiMethod = slug ? Posts.editPost : Posts.createPost;

  return apiMethod(data, slug)
    .then((res) => {
      dispatch(savePostRes());
      browserHistory.push(createPostLink(res.data));
    })
    .catch(({ response }) => {
      dispatch(savePostRes(response.data));
    });
};

export default savePost;
