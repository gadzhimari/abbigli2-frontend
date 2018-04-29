import { UPDATE_LOCATION } from 'react-router-redux-sync';

export default function (req, res, next) {
  req.redux.dispatch({
    type: UPDATE_LOCATION,
    payload: req.renderProps.renderProps.location
  });
  next();
}
