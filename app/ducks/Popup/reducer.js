import * as actions from './actonsTypes';

const initialState = {
  openedPopup: null,
  options: {},
};

const popupReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case actions.OPEN_POPUP:
      return Object.assign({}, state, {
        openedPopup: action.name,
        options: action.options,
      });
    case actions.CLOSE_POPUP:
      return Object.assign({}, state, {
        openedPopup: null,
        options: {},
      });
    default: return state;
  }
};

export default popupReducer;
