import { openPopup } from '../../app/ducks/Popup/actions';

function showPopup(req, res, next) {
  const { redux, cookies } = req;

  if (cookies.showPopup === 'true') {
    redux.dispatch(openPopup('passwordPopup'));
    res.clearCookie('showPopup');
  }

  next();
}

export default showPopup;
