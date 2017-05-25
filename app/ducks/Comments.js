// Sections.js
import { API_URL } from 'config';
import { setJsonToStorage, getJsonFromStorage } from 'utils/functions';

const ENDPOINT = API_URL + 'posts/:slug/comments/';

// Actions
const REQUEST = 'abbigli/Comments/REQUEST';
const SET = 'abbigli/Comments/SET';
const PREPEND = 'abbigli/Comments/PREPEND';

// Reducer
export default function (state = {
  isFetching: false,
  items: []
}, action = {}) {
  switch (action.type) {
    case SET:
      return Object.assign({}, state, {
        items: action.data.results,
        isFetching: false,
      });
    case PREPEND:
      return Object.assign({}, state, {
        items: state.items,
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
    ENDPOINT,
  };
}

export function setData(responseData) {
  return {
    type: SET,
    data: responseData,
  };
}

export function fetchData(slug) {
  return (dispatch) => {
    dispatch(requestData());
    return fetch(ENDPOINT.replace(':slug', slug))
      .then(res => res.json())
      .then((responseData) => {
        if (responseData.results) {
          dispatch(setData(responseData));
        }
      });
  };
}


export function sendComment(data) {
  const token = getJsonFromStorage('id_token') || null;
  const config = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `JWT ${token}`
    },
    body: JSON.stringify({
      comment: (data.comment),
      slug: encodeURIComponent(data.slug),
    }),
  };

  return dispatch => fetch(ENDPOINT.replace(':slug', data.slug), config)
    .then(res => res.json())
    .then((responseData) => {
      if (responseData) {
        dispatch(fetchData(data.slug));
      }
    }).catch(err => console.log("Error: ", err))
}

