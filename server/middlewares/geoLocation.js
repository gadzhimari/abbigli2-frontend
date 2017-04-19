import geoLite from 'node-geolite2';

geoLite.init();

const geoLocation = (req, res, next) => {
  const location = geoLite.getGeoDataSync(req.ip.replace('::ffff:', ''));
  const country = location
    ? location.country.names.en
    : '';

  res.cookie('ip', req.ip.replace('::ffff:', ''));
  res.cookie('country', country);

  next();
};

export default geoLocation;
