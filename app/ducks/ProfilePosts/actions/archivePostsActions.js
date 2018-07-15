import { deletePostFromPage } from './deletePost';
import { Products } from '../../../api';
import { closePopup } from '../../Popup/actions';

export function addPostToArchive(slug) {
  return (dispatch) => {
    dispatch(deletePostFromPage(slug));

    return Products.edit({ status: 'archived' }, slug);
  };
}

export function batchAddToArchive(slugs) {
  return (dispatch) => {
    dispatch(deletePostFromPage(slugs));

    const promises = slugs.map(slug => Products.edit({ status: 'archived' }, slug)
      .catch(console.error)
    );

    return Promise.all(promises)
      .catch(() => {
        dispatch(closePopup()); // Закрываем попап подтверждени архивирования
      });
  };
}

export function unarchivatePost(slug) {
  return (dispatch) => {
    dispatch(deletePostFromPage(slug));

    return Products.edit({ status: 'published' }, slug);
  };
}

