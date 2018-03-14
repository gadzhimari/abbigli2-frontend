import { createAction } from 'redux-actions';
import { Posts } from '../api';

const REQUEST = 'PostsSpecific/REQUEST';
const SET = 'PostsSpecific/SET';

const requestData = createAction(REQUEST);
const setData = createAction(SET);

const initialState = {
  isFetching: true,
  next: null,
  items: [],
  pages: 0,
};

const ITEMS_COUNT = 30;

export default function (state = initialState, action = {}) {
  switch (action.type) {
    case SET:
      return Object.assign({}, state, {
        items: action.payload.results,
        data: action.payload,
        next: action.payload.next,
        pages: Math.ceil(action.payload.count / ITEMS_COUNT),
        isFetching: false,
      });
    case REQUEST:
      return Object.assign({}, state, {
        isFetching: true,
        items: [],
      });
    default:
      return state;
  }
}

export function fetchData(specific = '', options = {}) {
  return (dispatch) => {
    dispatch(requestData());

    return Posts.getSpecificPosts(specific, options)
      .then((res) => {
        dispatch(setData(res.data));
      });
  };
}
