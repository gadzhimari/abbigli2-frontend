import express from 'express';
import fetch from 'isomorphic-fetch';
import { DOMAIN_URL } from '../../app/config';

const router = express();

router.get('/oauth/:social', (req, res) => {
  const config = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ code: req.query.code }),
  };

  fetch(`${DOMAIN_URL}api/social/${req.params.social}/`, config)
    .then(response => response.json(data => ({
      data,
      status: response,
    }))
    .then(({
      data,
      status,
    }) => {
      if (!status.ok) {
        throw new Error(JSON.stringify(data));
      }

      res
        .cookie('id_token', response.token, {
          maxAge: (1000 * 3600 * 24 * 1000),
        })
        .redirect('/');
    })
    .catch((err) => {
      res
        .cookie('oauth_error', err.message)
        .redirect('/');
    }));
});

export default router;
