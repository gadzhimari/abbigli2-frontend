import geoLite from 'node-geolite2';

geoLite.init();

const geoLocation = (req, res, next) => {
  const location = geoLite.getGeoDataSync(req.ip.replace('::ffff:', ''));

  res.cookie('ip', req.ip.replace('::ffff:', ''));
  res.cookie('country', location.country.names.en);

  next();
};

export default geoLocation;
