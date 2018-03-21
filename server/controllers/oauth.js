import { DOMAIN_URL } from '../../app/config';

const hashRegexp = /#.*/;

export default (req, res) => {
  const config = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ code: req.query.code }),
  };

  let { state } = req.query;

  state = state.replace(hashRegexp, '');

  fetch(`${DOMAIN_URL}/api/social/${req.params.social}/`, config)
    .then(response => response.json())
    .then((data) => {
      if (!data.token) {
        throw new Error(JSON.stringify(data));
      }

      res
        .cookie('id_token', data.token, {
          maxAge: (1000 * 3600 * 24 * 1000),
        })
        .redirect(302, state);
    })
    .catch((err) => {
      res
        .cookie('oauth_error', err.message)
        .redirect(302, state);
    });
};
