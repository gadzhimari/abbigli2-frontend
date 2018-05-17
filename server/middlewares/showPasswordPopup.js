import { openPopup } from '../../app/ducks/Popup/actions';

function showPasswordPopup(req, res, next) {
  const { redux, cookies } = req;

  if (cookies.showPasswordPopup === 'true') {
    redux.dispatch(openPopup('passwordPopup'));
    res.clearCookie('showPasswordPopup');
  }

  next();
}

export default showPasswordPopup;
