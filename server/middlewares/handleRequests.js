export default function handleRequests(req, res, next) {
  Promise.all(req.requests)
    .then(() => { next(); });
}
