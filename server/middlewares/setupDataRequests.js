import { fetchSections } from '../../app/ducks/Sections';

export default function setupDataRequests(req, res, next) {
  const { redux } = req;

  req.requests = [redux.dispatch(fetchSections())];

  next();
}
