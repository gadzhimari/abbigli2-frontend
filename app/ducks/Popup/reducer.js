import * as actions from './actionsTypes';

const initialState = {
  openedPopup: null,
  options: {},
};

const popupReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case actions.OPEN_POPUP: {
      document.body.classList.add('disable-scroll');
      return Object.assign({}, state, {
        openedPopup: action.name,
        options: action.options,
      });
    }
    case actions.CLOSE_POPUP:
      document.body.classList.remove('disable-scroll');
      return Object.assign({}, state, {
        openedPopup: null,
        options: {},
      });
    default: return state;
  }
};

export default popupReducer;
