// Sections.js
import { API_URL } from 'config';

const ENDPOINT = API_URL+'posts/?type=3&popular=True';

// Actions
const REQUEST   = 'abbigli/EventsPopular/REQUEST';
const SET = 'abbigli/EventsPopular/SET';

// Reducer
export default function(state = {
  isFetching: false,
  items: []
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
  return dispatch => {
    dispatch(requestData());
    return fetch(ENDPOINT)
      .then(res => res.json())
      .then((responseData) => {
        if(responseData.results){
          dispatch(setData(responseData));
        }
      })
  }
}

export function setData(responseData) {
  return {type: SET, data: responseData }
}