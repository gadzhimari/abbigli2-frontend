import * as actionsTypes from '../actionsTypes';

export const setFetchingStatus = (status = true) => ({
  type: actionsTypes.AUTH_REQUEST,
  status,
});

export const setError = (recieve, errors) => ({
  type: actionsTypes.AUTH_FAILURE,
  recieve,
  errors,
});

export const handleSucces = payload => ({
  type: actionsTypes.AUTH_SUCCESS,
  payload,
});
