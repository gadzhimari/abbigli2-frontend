import * as actions from './actonsTypes';

export const openPopup = (name, options = {}) => ({
  type: actions.OPEN_POPUP,
  name,
  options,
});

export const closePopup = () => ({
  type: actions.CLOSE_POPUP,
});

