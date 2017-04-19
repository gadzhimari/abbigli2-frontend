import geoLite from 'node-geolite2';

geoLite.init();

const geoLocation = (req, res, next) => {
  const location = geoLite.getGeoDataSync(req.ip.replace('::ffff:', ''));
  const country = location
    ? location.country.names.en
    : '';

  res.cookie('ip', req.ip);
  res.cookie('ip2', req.ips[0]);
  res.cookie('ip3', req.ips[1]);
  res.cookie('ip4', req.connection.remoteAddress);
  res.cookie('ip5', req.headers['x-forwarded-for']);

  // res.cookie('ip', req.ip.replace('::ffff:', ''));
  // res.cookie('country', country);

  next();
};

export default geoLocation;
