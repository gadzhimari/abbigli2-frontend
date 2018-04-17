import { UPDATE_PARAMS } from 'react-router-redux-sync';

export default function (req, res, next) {
  req.redux.dispatch({ UPDATE_PARAMS, payload: req.query });
  next();
}
