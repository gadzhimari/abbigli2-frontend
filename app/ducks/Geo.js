import { API_URL } from 'config';
import { getJsonFromStorage } from 'utils/functions';

const ENDPOINT = API_URL + 'geo/cities';

// Actions
const REQUEST = 'abbigli/Geo/REQUEST';
const RESPONSE = 'abbigli/Geo/RESPONSE';
const SET = 'abbigli/Geo/SET';
const SET_COORDINATES = 'SET_COORDINATES';
const SET_COUNTRY = 'SET_COUNTRY';
const SAVE_CITY = 'SAVE_CITY';

// Reducer
export default function (state = {
  isFetching: false,
  coordinates: {},
  country: '',
  city: null,
  showConfirmCity: false,
  options: {},
}, action = {}) {
  switch (action.type) {
    case SET:
      return Object.assign({}, state, {
        cities: action.data,
        isFetching: false,
      });
    case REQUEST:
      return Object.assign({}, state, {
        isFetching: true,
      });
    case RESPONSE:
      return Object.assign({}, state, {
        isFetching: false,
      });
    case SET_COORDINATES:
      return Object.assign({}, state, {
        coordinates: action.coordinates,
      });
    case SET_COUNTRY:
      return Object.assign({}, state, {
        country: action.code,
      });
    case SAVE_CITY:
      return Object.assign({}, state, {
        city: action.city,
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

export function responseData() {
  return {
    type: RESPONSE,
  };
}

export function saveCity(city) {
  return {
    type: SAVE_CITY,
    city,
  };
}

export function setData(responseData) {
  return {
    type: SET,
    data: responseData,
  };
}

export function getCities() {
  let token = getJsonFromStorage('id_token') || null;
  let config = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  };

  if (token) { config.headers.Authorization = `JWT ${token}`; }

  return (dispatch) => {
    dispatch(requestData());

    return fetch(ENDPOINT, config)
      .then(res => res.json())
      .then((response) => {
        if (response) {
          dispatch(setData(response))
        }
      }).catch(err => console.log("Error: ", err))
  }
}
