import { createActions } from 'redux-actions';
import { Posts, Products, Events } from '../../../api';

import { PRODUCT_TYPE, BLOG_TYPE, EVENT_TYPE } from '../../../lib/constants/posts-types';

export const {
  deletePostFromPage
} = createActions('DELETE_POST_FROM_PAGE');

const apiByType = {
  [PRODUCT_TYPE]: Products,
  [BLOG_TYPE]: Posts,
  [EVENT_TYPE]: Events
};

export default function deletePost(slug, type) {
  const api = apiByType[type];

  return (dispatch) => {
    dispatch(deletePostFromPage(slug));
    return api.delete(slug);
  };
}
