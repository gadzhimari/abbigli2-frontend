// Sections.js
import { DOMAIN_URL } from 'config';

// Actions
const REQUEST = 'abbigli/Sections/REQUEST';
const SET = 'abbigli/Sections/SET';

// Reducer
export default function (state = {
  isFetching: true,
  items: [],
  subsections: [],
  normalizedCategories: {},
  promo: {},
}, action = {}) {
  switch (action.type) {
    case SET:
      return Object.assign({}, state, {
        items: action.categories,
        subsections: action.sections,
        normalizedCategories: action.normalizedCategories,
        promo: action.promo,
        isFetching: false,
      });
    case REQUEST:
      return Object.assign({}, {
        isFetching: true,
        items: [],
      });
    default:
      return state;
  }
}

// Action Creators
export function requestData() {
  return {
    type: REQUEST,
  };
}

export function setData(data) {
  return {
    type: SET,
    ...data,
  };
}

export function fetchData() {
  return (dispatch) => {

    return fetch(`http://localhost:3000/node-api/catalog/`)
      .then(res => res.json())
      .then((data) => {
        dispatch(setData({
          categories: data.categories,
          sections: data.sections,
          normalizedCategories: data.normalizedCategories,
          promo: data.promo,
        }));
      });
  };
}

