export default function setupAccessHeader(req, res, next) {
  res.set(
    'Access-Control-Allow-Headers',
    'accept, accept-encoding, authorization, content-type, dnt, origin, user-agent, x-csrftoken, x-requested-with'
  );
  res.set('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.set('Access-Control-Allow-Origin', '*');

  next();
}
