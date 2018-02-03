import { createAction, handleAction } from 'redux-actions';

const SET_IS_TOUCH = 'SET_IS_TOUCH';
export const setIsTouch = createAction(SET_IS_TOUCH);

export default handleAction(
  SET_IS_TOUCH,
  (state, { payload }) => payload,
  false
);
