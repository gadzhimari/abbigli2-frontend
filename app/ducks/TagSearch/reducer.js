import * as actions from './actionsTypes';
import { calculatePagesCount } from '../../lib/calculatePagesCount';

const initialState = {
  isFetching: true,
  items: [],
  tags: [],
  pagesCount: 0,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case (actions.POSTS_REQUEST): {
      return Object.assign({}, state, {
        isFetching: true,
      });
    }
    case (actions.POSTS_RESPONSE): {
      return Object.assign({}, state, {
        isFetching: false,
        items: action.data.results,
        pagesCount: calculatePagesCount(action.data.count)
      });
    }
    case (actions.TAGS_RESPONSE): {
      return Object.assign({}, state, {
        tags: action.data,
      });
    }
    default: {
      return state;
    }
  }
};

export default reducer;
