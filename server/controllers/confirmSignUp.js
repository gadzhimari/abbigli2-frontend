import { Auth } from '../../app/api';
import logger from '../logger';

const COOKIES_EXPIRES = 3600 * 24 * 10;

export default (req, res) => {
  const { query } = req;
  const queryKey = 'email_confirmation_code';

  if (queryKey in query) {
    const credentials = {
      code: query[queryKey],
    };

    Auth.signUpConfirm(credentials)
      .then((response) => {
        res.cookie('id_token2', response.data.token, {
          maxAge: COOKIES_EXPIRES
        });
        res.cookie('showWelcomePopup', true);
        res.redirect(302, '/');
      })
      .catch((error) => {
        logger.error('signUpConfirm', error.stack || error);
      });
  }
};
