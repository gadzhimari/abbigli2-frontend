import { combineReducers } from 'redux';
import { handleActions } from 'redux-actions';

import * as actions from './actions';
import { calculatePagesCount } from '../../lib/calculatePagesCount';

const eventsFetchingState = handleActions({
  [actions.fetchEventsRequest]() {
    return true;
  },
  [actions.fetchEventsSuccess]() {
    return false;
  },
  [actions.fetchEventsFailure]() {
    return false;
  },
}, true);

const page = handleActions({
  [actions.fetchEventsSuccess](state, { payload: { results, count } }) {
    const pageCount = calculatePagesCount(count);
    return { ...state, items: results, count: pageCount };
  },
}, {
  items: [],
  count: 1
});

export default combineReducers({
  eventsFetchingState,
  page,
});
