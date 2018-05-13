import { Auth } from '../../app/api';

const COOKIES_EXPIRES = 3600 * 24 * 10;

function sendConfirmCode(req, res, next) {
  const { query } = req;
  const queryKey = 'email_confirmation_code';

  if (queryKey in query) {
    const credentials = {
      contact: query.contact,
      code: query[queryKey],
    };

    Auth.resetPasswordConfirm(credentials)
      .then((response) => {
        res.cookie('id_token2', response.data.token, {
          maxAge: COOKIES_EXPIRES
        });
        res.cookie('showPopup', true);
        res.redirect(302, '/');
      });
  } else {
    next();
  }
}

export default sendConfirmCode;
