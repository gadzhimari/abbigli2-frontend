export default function setupAccessHeader(req, res, next) {
  res.set('Access-Control-Allow-Origin', '*');

  next();
}
