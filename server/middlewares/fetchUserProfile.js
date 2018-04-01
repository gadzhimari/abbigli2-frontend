import { fetchMe } from '../../app/ducks/Auth/authActions';

export default function fetchUserProfile(req, res, next) {
  const { redux, cookies } = req;

  if (!cookies.id_token2) {
    next();
    return;
  }

  redux.dispatch(fetchMe(cookies.id_token2))
    .then(() => next());
}
