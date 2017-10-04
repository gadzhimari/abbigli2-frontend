import { TOGGLE_FAVORITE } from '../actionTypes';

import { getJsonFromStorage } from 'utils/functions';
import { stagedPopup } from 'ducks/Auth/authActions';

import { Posts } from 'API';

const updateFavorite = () => ({
  type: TOGGLE_FAVORITE,
});

const toggleFavorite = (slug) => {
  const token = getJsonFromStorage('id_token');

  return (dispatch) => {
    if (!token) {
      return dispatch(stagedPopup('register'));
    }

    dispatch(updateFavorite());

    return Posts.toggleFavorite(slug);
  };
};

export default toggleFavorite;
