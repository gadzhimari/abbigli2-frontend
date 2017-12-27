import moment from 'moment';
import { createAction } from 'redux-actions';
import { Posts } from '../api';

const REQUEST = 'abbigli/Events/REQUEST';
const SET = 'abbigli/Events/SET';
const CHANGE_SEARCH_FIELD = 'abbigli/Events/CHANGE_SEARCH_FIELD';

const requestData = createAction(REQUEST);
const setData = createAction(SET);
export const changeSearchField = createAction(CHANGE_SEARCH_FIELD);

const initialState = {
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
};

export default function (state = initialState, action = {}) {
  switch (action.type) {
    case SET:
      return {
        ...state,
        items: action.payload.data.results,
        next: action.payload.data.next,
        isFetching: false,
        page: action.payload.page + 1,
        pages: Math.ceil(action.payload.data.count / 30),
      };
    case REQUEST:
      return {
        ...state,
        isFetching: true,
        items: [],
      };
    case CHANGE_SEARCH_FIELD:
      return {
        ...state,
        searchFields: {
          ...state.searchFields,
          [action.payload.name]: action.payload.value,
        },
      };
    default:
      return state;
  }
}

export function fetchData(options = {}) {
  return (dispatch) => {
    dispatch(requestData());

    return Posts.getPosts(options)
      .then((res) => {
        dispatch(setData({
          data: res.data,
          page: Number(options.page) || 1,
        }));
      });
  };
}
