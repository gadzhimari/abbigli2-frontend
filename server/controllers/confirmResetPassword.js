import { Auth } from '../../app/api';
import logger from '../logger';

const COOKIES_EXPIRES = 3600 * 24 * 10;

export default (req, res) => {
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
        res.cookie('showPasswordPopup', true);
        res.redirect(302, '/');
      })
      .catch((error) => {
        logger.error('resetPasswordConfirm', error.stack || error);
      });
  }
};
