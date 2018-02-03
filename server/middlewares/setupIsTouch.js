import { setIsTouch } from '../../app/ducks/isTouch';

const touchDevices = new Set(['phone', 'tablet']);

export default function setupIsTouch(req, res, next) {
  req.redux.dispatch(setIsTouch(touchDevices.has(req.device.type)));

  next();
}
