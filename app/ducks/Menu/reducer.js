import { TOGGLE_MENU, CLOSE_MENU } from './actionsTypes';

const initialState = {
  open: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_MENU: {
      return Object.assign({}, state, {
        open: !state.open,
      });
    }
    case CLOSE_MENU: {
      return Object.assign({}, state, {
        open: false,
      });
    }
    default: {
      return state;
    }
  }
};

export default reducer;
