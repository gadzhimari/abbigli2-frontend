import express from 'express';
import fetch from 'isomorphic-fetch';
import { DOMAIN_URL } from '../../app/config';

const router = express();

router.get('/oauth/facebook', (req, res) => {
  const config = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ code: req.query.code }),
  };

  fetch(`${DOMAIN_URL}api/social/facebook/`, config)
    .then(response => res
      .cookie('id_token', response.token)
      .redirect('/')
    );
});

router.get('/oauth/google', (req, res) => {
  const config = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ code: req.query.code }),
  };

  fetch(`${DOMAIN_URL}api/social/google/`, config)
    .then(response => res
      .cookie('id_token', response.token)
      .redirect('/')
    );
});

export default router;
