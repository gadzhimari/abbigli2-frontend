// Sections.js
import { API_URL } from 'config';
import fetch from 'isomorphic-fetch';

// Actions
const SET = 'abbigli/settings/SET';
const SET_GEO = 'abbigli/settings/SET_GEO';

const initialState = {
  data: {
    CURRENCY: '$ ?',
  },
  geo: [],
};

// Reducer
export default function (state = initialState, action = {}) {
  switch (action.type) {
    case SET:
      return Object.assign({}, state, {
        data: action.data,
      });
    case SET_GEO:
      return Object.assign({}, state, {
        geo: action.data
          .map(item => ({
            value: item.phone,
            label: `${item.name} (${item.phone})`,
          })),
      });
    default:
      return state;
  }
}

// Action Creators
export function setData(responseData) {
  return { type: SET, data: responseData };
}

export function setGeo(responseData) {
  return { type: SET_GEO, data: responseData };
}

export function fetchData() {
  return dispatch => fetch(`${API_URL}settings/`)
    .then(res => res.json())
    .then(responseData => dispatch(setData(responseData)));
}

export function fetchGeo() {
  return dispatch => fetch(`${API_URL}geo/countries/?page_size=255`)
    .then(res => res.json())
    .then(responseData => dispatch(setGeo(responseData.results)));
}
