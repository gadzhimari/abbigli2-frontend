import * as actions from './actionsTypes';

export const openPopup = (name, options = {}, showOverlay = true) => ({
  type: actions.OPEN_POPUP,
  name,
  options,
  showOverlay,
});

export const closePopup = () => ({
  type: actions.CLOSE_POPUP,
});

export const updateOptions = options => ({
  type: actions.UPDATE_OPTIONS,
  options,
});

