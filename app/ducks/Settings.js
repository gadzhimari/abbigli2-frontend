// Sections.js
import { API_URL } from 'config';
import fetch from 'isomorphic-fetch';

// Actions
const SET = 'abbigli/settings/SET';

const initialState = {
  data: {},
};

// Reducer
export default function (state = initialState, action = {}) {
  switch (action.type) {
    case SET:
      return Object.assign({}, state, {
        data: action.data,
      });
    default:
      return state;
  }
}

// Action Creators
export function setData(responseData) {
  return { type: SET, data: responseData };
}

export function fetchData() {
  return dispatch => fetch(`${API_URL}settings/`)
    .then(res => res.json())
    .then(responseData => dispatch(setData(responseData)));
}
