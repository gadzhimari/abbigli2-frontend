import { createActions, handleActions } from 'redux-actions';
import { Catalog, errorHandler } from '../api';

const {
  setCategories,
  fetchCategories
} = createActions('SET_CATEGORIES', 'FETCH_CATEGORIES');

const initalState = {
  isFetching: true,
  items: [],
  subsections: [],
  normalizedCategories: {},
  promo: {},
};

export default handleActions({
  [setCategories](state, { payload }) {
    return {
      ...state,
      items: payload.categories,
      subsections: payload.sections,
      normalizedCategories: payload.normalizedCategories,
      promo: payload.promo,
      isFetching: false
    };
  },
  [fetchCategories](state) {
    return {
      ...state,
      isFetching: true
    };
  }
}, initalState);

export function fetchSections() {
  return (dispatch, getState, logger) => {
    dispatch(fetchCategories());

    return Catalog.getCatalog()
      .then((res) => { dispatch(setCategories(res.data)); })
      .catch((err) => { errorHandler(err, logger); });
  };
}
