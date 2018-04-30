import { createActions, handleActions } from 'redux-actions';
import { Users } from '../../api';

import { calculatePagesCount } from '../../lib/calculatePagesCount';

export const {
  peopleRequest,
  peopleSuccess,
  peopleFailure
} = createActions(
  'PEOPLE_REQUEST',
  'PEOPLE_SUCCESS',
  'PEOPLE_FAILURE'
);

const initialState = {
  isFetching: true,
  users: [],
  pagesCount: 0
};

export default handleActions({
  [peopleRequest](state) {
    return {
      ...state,
      isFetching: true
    };
  },
  [peopleSuccess](state, { payload }) {
    return {
      ...state,
      isFetching: false,
      users: payload.results,
      usersCount: payload.count,
      pagesCount: calculatePagesCount(payload.count)
    };
  },
}, initialState);

export const getUsers = params => (dispatch) => {
  dispatch(peopleRequest());

  return Users.getUsers(params);
};
