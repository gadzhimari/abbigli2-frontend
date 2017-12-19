import state from '../../index';
import { openPopup } from '../../ducks/Popup/actions';

function onlyAuthAction(action) {
  return (...args) => {
    const { isAuthenticated } = state.getState().Auth;

    if (isAuthenticated) {
      return state.dispatch(action(...args));
    }

    return state.dispatch(openPopup('registerPopup'));
  };
}

export default onlyAuthAction;
