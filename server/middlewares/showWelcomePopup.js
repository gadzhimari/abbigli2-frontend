import { openPopup } from '../../app/ducks/Popup/actions';

function showWelcomePopup(req, res, next) {
  const { redux, cookies } = req;

  if (cookies.showWelcomePopup === 'true') {
    redux.dispatch(openPopup('welcomePopup'));
    res.clearCookie('showWelcomePopup');
  }

  next();
}

export default showWelcomePopup;
