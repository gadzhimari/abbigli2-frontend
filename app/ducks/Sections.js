import { createAction } from 'redux-actions';
import { Catalog } from '../api';

const SET = 'Sections/SET';

const setData = createAction(SET);

const initalState = {
  items: [],
  subsections: [],
  normalizedCategories: {},
  promo: {},
};

export default function (state = initalState, action = {}) {
  if (action.type === SET) {
    return {
      ...state,
      items: action.payload.categories,
      subsections: action.payload.sections,
      normalizedCategories: action.payload.normalizedCategories,
      promo: action.payload.promo,
    };
  }

  return state;
}

export function fetchData() {
  return dispatch => Catalog.getCatalog()
    .then((res) => {
      dispatch(setData(res.data));
    });
}
