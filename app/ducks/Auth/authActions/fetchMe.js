import { createActions } from 'redux-actions';
import { SET_ME, SET_ME_ERROR } from '../actionsTypes';
import { Auth, errorHandler } from '../../../api';

export const {
  setMe,
  setMeError
} = createActions(SET_ME, SET_ME_ERROR);

const fetchMe = token => (dispatch, getState, logger) => Auth.getMyProfile(token)
  .then(res => dispatch(setMe(res.data)))
  .catch((err) => {
    dispatch(setMeError());
    errorHandler(err, logger);
  });

export default fetchMe;
