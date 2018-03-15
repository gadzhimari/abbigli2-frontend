import browserHistory from 'react-router/lib/browserHistory';

import { Posts } from '../../../api';
import * as actions from '../actionTypes';

import { PRODUCT_TYPE, BLOG_TYPE, EVENT_TYPE } from '../../../lib/constants/posts-types';
import createPostLink from '../../../lib/links/post-link';
import { gaSend } from '../../../lib/analitics';

const gaActionsByPostType = {
  [PRODUCT_TYPE]: 'addproduct_successful',
  [BLOG_TYPE]: 'addpost_successful',
  [EVENT_TYPE]: 'addevent_successful',
};

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

      if (slug) {
        const action = gaActionsByPostType[data.type];

        gaSend({
          hitType: 'pageview',
          page: `/${action}`,
          title: action
        });
      }
    })
    .catch(({ response }) => {
      dispatch(savePostRes(response.data));
    });
};

export default savePost;
