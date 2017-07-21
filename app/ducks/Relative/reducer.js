import { RELATIVE_REQUEST, RELATIVE_RESPONSE } from './actions';

const initialState = {
  isFetching: true,
  items: [],
  post: {},
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case (RELATIVE_REQUEST): {
      return Object.assign({}, state, {
        isFetching: true,
      });
    }
    case (RELATIVE_RESPONSE): {
      return Object.assign({}, state, {
        isFetching: false,
        items: action.items,
        post: action.post,
      });
    }
    default: {
      return state;
    }
  }
};

export default reducer;
