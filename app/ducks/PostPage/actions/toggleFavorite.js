import { TOGGLE_FAVORITE } from '../actionTypes';

import { stagedPopup } from '../../../ducks/Auth/authActions';

import { Posts } from '../../../api';
import { getCookie } from '../../../lib/cookie';

const updateFavorite = () => ({
  type: TOGGLE_FAVORITE,
});

const toggleFavorite = (slug) => {
  const token = getCookie('id_token2');

  return (dispatch) => {
    if (!token) {
      return dispatch(stagedPopup('signUp'));
    }

    dispatch(updateFavorite());

    return Posts.toggleFavorite(slug);
  };
};

export default toggleFavorite;
