import { createActions, handleActions } from 'redux-actions';
import { Catalog, errorHandler } from '../api';

const SET_SECTIONS = 'SET_SECTIONS';
const { setSections } = createActions(SET_SECTIONS);

const initalState = {
  items: [],
  subsections: [],
  normalizedCategories: {},
  promo: {},
};

export default handleActions({
  [setSections](state, { payload }) {
    return {
      ...state,
      items: payload.categories,
      subsections: payload.sections,
      normalizedCategories: payload.normalizedCategories,
      promo: payload.promo,
    };
  }
}, initalState);

export function fetchSections() {
  return (dispatch, getState, logger) => Catalog.getCatalog()
    .then((res) => { dispatch(setSections(res.data)); })
    .catch((err) => { errorHandler(err, logger); });
}
