/**
 * Объект отвечающий за синхронизацию со браузерной историей
 * Основан на подписке на объект browserHistory
 */

import { createAction, handleActions } from 'redux-actions';
import store from '../../store/store';

export const updateLocation = createAction('UPDATE_LOCATION');

const initialState = {
  query: {},
  location: {}
};

export const syncLocationWithStore = (location) => {
  store.dispatch(updateLocation(location));
};

export default handleActions({
  [updateLocation](state, { payload: { query, ...location } }) {
    return { location, query };
  }
}, initialState);
