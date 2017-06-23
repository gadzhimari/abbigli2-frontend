import { API_URL } from 'config';
import { getJsonFromStorage } from 'utils/functions';

const ENDPOINT = API_URL + 'posts/?main=true&type=1';

// Actions
const REQUEST = 'abbigli/Products/REQUEST';
const SET = 'abbigli/Products/SET';

// Reducer
export default function (state = {
  isFetching: true,
  items: [],
}, action = {}) {
  switch (action.type) {
    case SET:
      return Object.assign({}, state, {
        items: action.data.results,
        isFetching: false
      })
    case REQUEST:
      return Object.assign({}, {
        isFetching: true,
        items: []
      })
    default:
      return state;
  }
}

// Action Creators
export function requestData() {
  return {
    type: REQUEST,
    ENDPOINT
  }
}


export function fetchData() {
  let token = getJsonFromStorage('id_token') || null;
  let config = {};
  if (token) {
    config = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `JWT ${token}`,
      },
    };
  }

  return dispatch => {
    dispatch(requestData());
    return fetch(ENDPOINT, config)
      .then(res => res.json())
      .then((responseData) => dispatch(setData(responseData)))
  }
}

export function setData(responseData) {
  return { type: SET, data: responseData }
}