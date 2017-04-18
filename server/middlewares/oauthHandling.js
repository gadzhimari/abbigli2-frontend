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
    .then(result => result.json())
    .then(response => res
      .cookie('id_token', response.token)
      .redirect('/')
    );
});

export default router;
