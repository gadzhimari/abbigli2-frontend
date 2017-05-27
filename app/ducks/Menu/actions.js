import { TOGGLE_MENU, CLOSE_MENU } from './actionsTypes';

export default () => ({
  type: TOGGLE_MENU,
});

export const closeMenu = () => ({
  type: CLOSE_MENU,
});
