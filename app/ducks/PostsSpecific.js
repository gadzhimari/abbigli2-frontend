import { createAction } from 'redux-actions';
import { Products } from '../api';
import { calculatePagesCount } from '../lib/calculatePagesCount';

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

export default function (state = initialState, action = {}) {
  switch (action.type) {
    case SET:
      return Object.assign({}, state, {
        items: action.payload.results,
        data: action.payload,
        next: action.payload.next,
        pages: calculatePagesCount(action.payload.count),
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

export function fetchData(options = {}) {
  return (dispatch) => {
    dispatch(requestData());

    return Products.getProducts({ ...options })
      .then((res) => {
        dispatch(setData(res.data));
      });
  };
}
