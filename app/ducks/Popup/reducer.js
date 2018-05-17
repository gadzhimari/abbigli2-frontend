import * as actions from './actionsTypes';

const initialState = {
  openedPopup: null,
  options: {},
  showOverlay: false,
};

const popupReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case actions.OPEN_POPUP: {
      return Object.assign({}, state, {
        openedPopup: action.name,
        options: action.options,
        showOverlay: action.showOverlay,
      });
    }
    case actions.CLOSE_POPUP:
      return Object.assign({}, state, {
        openedPopup: null,
        options: {},
        showOverlay: false,
      });
    case actions.UPDATE_OPTIONS:
      return Object.assign({}, state, {
        options: { ...state.options, ...action.options },
      });
    default: return state;
  }
};

export default popupReducer;
