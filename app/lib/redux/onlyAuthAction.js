/* eslint consistent-return: 0 */
import { openPopup } from '../../ducks/Popup/actions';

export default function onlyAuthAction(action) {
  return (...args) => (dispatch, getState) => {
    const { isAuthenticated } = getState().Auth;

    if (isAuthenticated) {
      return dispatch(action(...args));
    }

    dispatch(openPopup('signUpPopup'));
  };
}
