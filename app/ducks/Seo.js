// Sections.js
import fetch from 'isomorphic-fetch';
import { API_URL } from 'config';

// Actions
const SET = 'abbigli/seo/SET';

const initialState = {
  data: [],
};

// Reducer
export default function (state = initialState, action = {}) {
  switch (action.type) {
    case SET:
      return Object.assign({}, state, {
        data: action.data.results,
        isFetching: false,
      });
    default:
      return state;
  }
}

export function setData(responseData) {
  return { type: SET, data: responseData };
}

export function fetchData() {
  return dispatch => fetch(`${API_URL}seo/`)
    .then(res => res.json())
    .then(response => dispatch(setData(response)));
}
