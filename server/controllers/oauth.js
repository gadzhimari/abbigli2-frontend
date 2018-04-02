import { Auth } from '../../app/api';
import logger from '../logger';

export default (req, res) => {
  const { state } = req.query;

  Auth.oauth(req.params.social, { code: req.query.code })
    .then(({ data }) => {
      if (!data.token) {
        throw new Error(JSON.stringify(data));
      }

      res
        .cookie('id_token2', data.token, {
          maxAge: (1000 * 3600 * 24 * 1000),
        })
        .redirect(302, state);
    })
    .catch((err) => {
      logger.error('oauth', err.stack || err);
      res
        .cookie('oauth_error', err.message)
        .redirect(302, state);
    });
};
