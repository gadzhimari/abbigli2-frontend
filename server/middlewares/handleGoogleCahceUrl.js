import { DOMAIN_URL } from '../../app/config';

const urlWithoutProtocol = DOMAIN_URL.split('://')[1];

module.exports = (req, res, next) => {
  if (req.path === '/search' && req.query.q.includes(urlWithoutProtocol)) {
    const siteUrl = req.query.q
      .split(':')
      .filter(item => item.includes(urlWithoutProtocol))[0];

    const newPath = siteUrl.replace(`//${urlWithoutProtocol}`, '/');

    req.newPath = newPath;
  }

  next();
};
