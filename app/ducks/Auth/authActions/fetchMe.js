import { createActions } from 'redux-actions';
import { ME_STORE, SET_ME_ERROR } from '../actionsTypes';
import { Auth } from '../../../api';

export const setMe = data => ({
  type: ME_STORE,
  data,
});

export const { setMeError } = createActions(SET_ME_ERROR);

const fetchMe = token => dispatch => Auth.getMyProfile(token)
  .then(res => dispatch(setMe(res.data)))
  .catch(() => { dispatch(setMeError()); });

export default fetchMe;
