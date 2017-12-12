import maxmind from 'maxmind';
import path from 'path';

const cityLookup = maxmind.openSync(path.resolve(__dirname, '../geo-base/GeoLite2-City.mmdb'));

const geoLocation = (req, res, next) => {
  let ip;

  if (process.env.NODE_ENV === 'production') {
    ip = req.ip.replace('::ffff:', '');
  } else {
    ip = '85.140.76.178';
  }

  const city = cityLookup.get(ip);

  if (city && city.country) {
    req.redux.dispatch({
      type: 'SET_COUNTRY',
      code: city.country.iso_code,
    });

    req.redux.dispatch({
      type: 'SET_COORDINATES',
      coordinates: city.location,
    });

    res.cookie('countryCode', city.country.iso_code);
  }

  next();
};

export default geoLocation;
