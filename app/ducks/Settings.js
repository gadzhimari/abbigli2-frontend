// Sections.js
import { API_URL } from 'config';

const ENDPOINT = API_URL+'settings/';

// Actions
const REQUEST = 'abbigli/settings/REQUEST';
const SET = 'abbigli/settings/SET';

// Reducer
export default function (state = {
    isFetching: false,
    data: {},
}, action = {}) {
    switch (action.type) {
        case SET:
            return Object.assign({}, state, {
                data: action.data,
                isFetching: false,
            });
        case REQUEST:
            return Object.assign({}, {
                isFetching: true,
                data: {},
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


export function fetchData() {
    return dispatch => {
        dispatch(requestData());
        return fetch(ENDPOINT)
          .then(res => res.json())
          .then((responseData) => {
              if (responseData) {
                  dispatch(setData(responseData));
              }
          });
    };
}

export function setData(responseData) {
    return { type: SET, data: responseData };
}
