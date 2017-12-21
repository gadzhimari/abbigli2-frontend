import { FOLLOW_REQUEST, FOLLOW_RESPONSE } from './actions';

const initialState = { isFetching: false };

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case (FOLLOW_REQUEST): {
      return Object.assign({}, state, {
        isFetching: true,
      });
    }
    case (FOLLOW_RESPONSE): {
      return Object.assign({}, state, {
        isFetching: false,
      });
    }
    default: {
      return state;
    }
  }
};

export default reducer;
