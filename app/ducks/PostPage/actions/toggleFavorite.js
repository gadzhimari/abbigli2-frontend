import { createAction } from 'redux-actions';

import { stagedPopup } from '../../../ducks/Auth/authActions';

import { Posts, Products, Events } from '../../../api';
import { getCookie } from '../../../lib/cookie';
import { BLOG_TYPE, PRODUCT_TYPE, EVENT_TYPE } from '../../../lib/constants/posts-types';

export const updateFavorite = createAction('UPDATE_FAVORITE');

const apiByType = {
  [BLOG_TYPE]: Posts,
  [PRODUCT_TYPE]: Products,
  [EVENT_TYPE]: Events
};

const toggleFavorite = (type, slug) => {
  const token = getCookie('id_token2');
  const api = apiByType[type];

  return (dispatch) => {
    if (!token) {
      return dispatch(stagedPopup('signUp'));
    }

    dispatch(updateFavorite());

    return api.toggleFavorite(slug);
  };
};

export default toggleFavorite;
