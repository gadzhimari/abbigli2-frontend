import { API_URL } from 'config';
import { setJsonToStorage, getJsonFromStorage } from 'utils/functions';

const ENDPOINT = API_URL+'geo/cities';

// Actions
const REQUEST   = 'abbigli/Geo/REQUEST';
const RESPONSE  = 'abbigli/Geo/RESPONSE';
const SET   = 'abbigli/Geo/SET';

// Reducer
export default function(state = {
  isFetching: false
}, action = {}) {
  switch (action.type) {
    case SET:
      return Object.assign({}, state, {
        cities: action.data,
        isFetching: false
      })
    case REQUEST:
      return Object.assign({}, {
        isFetching: true
      })
    case RESPONSE:
      return Object.assign({}, {
        isFetching: false
      })
    default:
      return state;
  }
}

// Action Creators
export function requestData() {
  return {
    type: REQUEST
  }
}

export function responseData() {
  return {
    type: RESPONSE
  }
}

export function setData(responseData) {
  return {
    type: SET,
    data: responseData
  }
}

export function getCities() {
  let token = getJsonFromStorage('id_token') || null;
  let config = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    }
  }
    if(token){config.headers.Authorization = `JWT ${token}`;}
  return dispatch => {

    dispatch(requestData());

    return fetch(ENDPOINT, config)
      .then(res => res.json())
      .then((response) => {
        if(response){
          dispatch(setData(response))
        }
      }).catch(err => console.log("Error: ", err))
  }
}
