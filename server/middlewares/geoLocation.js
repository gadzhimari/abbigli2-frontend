import geoLite from 'node-geolite2';

geoLite.init();

const geoLocation = (req, res, next) => {
  const location = geoLite.getGeoDataSync(req.ip.replace('::ffff:', ''));
  const country = location
    ? location.country.iso_code
    : null;

  res.cookie('countryCode', country);

  next();
};

export default geoLocation;
