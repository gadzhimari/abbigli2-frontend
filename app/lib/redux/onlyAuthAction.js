/* eslint consistent-return: 0 */
import store from '../../store/store';
import { openPopup } from '../../ducks/Popup/actions';

export default function onlyAuthAction(action) {
  return (...args) => {
    const { isAuthenticated } = store.getState().Auth;

    if (isAuthenticated) {
      return store.dispatch(action(...args));
    }

    store.dispatch(openPopup('registerPopup'));
  };
}
