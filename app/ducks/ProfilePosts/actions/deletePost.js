import { createActions } from 'redux-actions';
import noop from 'lodash/noop';
import { Posts, Products, Events } from '../../../api';

import { PRODUCT_TYPE, BLOG_TYPE, EVENT_TYPE } from '../../../lib/constants/posts-types';
import { openPopup } from '../../Popup/actions';
import { __t } from '../../../i18n/translator';

export const {
  deletePostFromPage
} = createActions('DELETE_POST_FROM_PAGE');

const apiByType = {
  [PRODUCT_TYPE]: Products,
  [BLOG_TYPE]: Posts,
  [EVENT_TYPE]: Events
};

export default function deletePost(slug, type, callback = noop) {
  const api = apiByType[type];

  return (dispatch) => {
    dispatch(openPopup('confirmAction', {
      title: __t('modal.messages.confirmToDelete'),
      text: __t('modal.messages.deletedFiles'),
      actionButtonText: __t('common.delete'),

      action: () => {
        callback();
        dispatch(deletePostFromPage(slug));
        return api.delete(slug);
      }
    }));
  };
}

export function deleteBatchPosts(slugs, type, callback = noop) {
  const api = apiByType[type];

  return (dispatch) => {
    dispatch(openPopup('confirmAction', {
      title: __t('modal.messages.confirmToDelete'),
      text: __t('modal.messages.deletedFiles'),
      actionButtonText: __t('common.delete'),

      action: () => {
        callback();
        dispatch(deletePostFromPage(slugs));

        const promises = slugs.map(slug => api.delete(slug)
          .catch(console.error) // TODO: сделать нормальную обработку
        );

        return Promise.all(promises);
      }
    }));
  };
}
