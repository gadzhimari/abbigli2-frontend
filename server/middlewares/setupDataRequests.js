import { fetchSections } from '../../app/ducks/Sections';
import { fetchMe } from '../../app/ducks/Auth/authActions';

export default function setupDataRequests(req, res, next) {
  const { redux, cookies } = req;

  const requests = [
    redux.dispatch(fetchSections())
  ];

  if (cookies.id_token) {
    requests.push(redux.dispatch(fetchMe(cookies.id_token)));
  }

  req.requests = requests;

  next();
}
