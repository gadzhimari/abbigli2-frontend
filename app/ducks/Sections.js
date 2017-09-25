// Sections.js
import { API_URL } from 'config';

const promises = [
  fetch(`${API_URL}categories/`)
    .then(res => res.json()),
  fetch(`${API_URL}sections/`)
    .then(res => res.json()),
];

// Actions
const REQUEST = 'abbigli/Sections/REQUEST';
const SET = 'abbigli/Sections/SET';

// Reducer
export default function (state = {
  isFetching: true,
  items: [],
  subsections: [],
}, action = {}) {
  switch (action.type) {
    case SET:
      return Object.assign({}, state, {
        items: action.categories,
        subsections: action.sections,
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

export function setData(categories, sections) {
  return {
    type: SET,
    categories,
    sections,
  };
}


export function fetchData() {
  return (dispatch) => {
    dispatch(requestData());
    return Promise.all(promises)
      .then(([categories, sections]) => {
        dispatch(setData(categories.results, sections.results));
      });
  };
}

