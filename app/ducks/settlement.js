import { createAction, handleAction } from 'redux-actions';

const SET_SETTLEMENT = 'SET_SETTLEMENT';
export const setSettlement = createAction(SET_SETTLEMENT);

const initialState = {};

export default handleAction(
  SET_SETTLEMENT,
  (state, { payload }) => payload,
  initialState
);
