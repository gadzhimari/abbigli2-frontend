import { createAction } from 'redux-actions';
import { Posts } from '../api';

const REQUEST = 'abbigli/Products/REQUEST';
const SET = 'abbigli/Products/SET';

const requestData = createAction(REQUEST);
const setData = createAction(SET);

export default function (state = {
  isFetching: true,
  items: [],
}, action = {}) {
  switch (action.type) {
    case SET:
      return Object.assign({}, state, {
        items: action.payload.results,
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


export function fetchData() {
  return (dispatch) => {
    dispatch(requestData());

    return Posts.getPosts({ type: 1, main: true })
      .then((res) => {
        dispatch(setData(res.data));
      });
  };
}
