import { createActions } from 'redux-actions';
import { Posts, Products, Events } from '../../../api';

import { PRODUCT_TYPE, BLOG_TYPE, EVENT_TYPE } from '../../../lib/constants/posts-types';
import { closePopup } from '../../Popup/actions';

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

export function deleteBatchPosts(slugs, type) {
  const api = apiByType[type];
  const promises = slugs.map(slug => api.delete(slug)
    .catch(console.error) // TODO: сделать нормальную обработку
  );

  return (dispatch) => {
    dispatch(deletePostFromPage(slugs));

    return Promise.all(promises)
      .catch(() => {
        dispatch(closePopup()); // Закрываем попап подтверждени удаления
      });
  };
}
