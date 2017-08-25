// Sections.js
import { API_URL } from 'config';
import { getJsonFromStorage, createQuery } from 'utils/functions';
import moment from 'moment';

// Actions
const REQUEST = 'abbigli/Events/REQUEST';
const SET = 'abbigli/Events/SET';
const CHANGE_SEARCH_FIELD = 'abbigli/Events/CHANGE_SEARCH_FIELD';

// Reducer
export default function (state = {
  isFetching: true,
  next: null,
  items: [],
  isFetchingMore: false,
  page: 1,
  pages: 0,
  searchFields: {
    start: moment(new Date()).format('YYYY-MM-DD'),
    end: moment(new Date()).format('YYYY-MM-DD'),
    city: null,
  },
}, action = {}) {
  switch (action.type) {
    case SET:
      return Object.assign({}, state, {
        items: action.data.results,
        next: action.data.next,
        isFetching: false,
        page: action.page + 1,
        pages: Math.ceil(action.data.count / 30),
      });
    case REQUEST:
      return Object.assign({}, state, {
        isFetching: true,
        items: [],
      });
    case CHANGE_SEARCH_FIELD:
      return Object.assign({}, state, {
        searchFields: Object.assign(state.searchFields, {
          [action.field]: action.value,
        }),
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

export function setData(responseData, page) {
  return { type: SET, data: responseData, page };
}

export const changeSearchField = (field, value) => ({
  type: CHANGE_SEARCH_FIELD,
  field,
  value,
});

export function fetchData(options = {}) {
  const token = getJsonFromStorage('id_token') || null;
  const config = { headers: {} };
  const query = createQuery(options);

  if (token) {
    config.headers.Authorization = `JWT ${token}`;
  }

  return (dispatch) => {
    dispatch(requestData());

    return fetch(`${API_URL}posts${query}`, config)
      .then(res => res.json())
      .then((responseData) => {
        if (responseData.results) {
          dispatch(setData(responseData, Number(options.page) || 1));
        }
        return Promise.resolve();
      });
  };
}
