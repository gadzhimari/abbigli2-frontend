import { updateLocation } from '../../app/ducks/Location';

export default function syncLocation({ redux, renderProps }, res, next) {
  redux.dispatch(updateLocation(renderProps.renderProps.location));
  next();
}
