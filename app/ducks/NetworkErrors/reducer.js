import { createAction } from 'redux-actions';

const ERROR = 'SET_NETWORK_ERROR';
const CLEAR_ERROR = 'CLEAR_NETWORK_ERROR';
export const setNetworkError = createAction(ERROR);
export const clearNetworkError = createAction(CLEAR_ERROR);

const initial = {
  status: null,
  message: null,
};

const reducer = (state = initial, action) => {
  if (action.type === ERROR) {
    return {
      status: action.payload.status,
      message: action.payload.data.message,
    };
  }

  if (action.type === CLEAR_ERROR) {
    return initial;
  }

  return state;
};

export default reducer;
