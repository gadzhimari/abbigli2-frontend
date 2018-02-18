import { setIsTouch } from '../../app/ducks/isTouch';

export default function setupUseragent(req, res, next) {
  req.redux.dispatch(setIsTouch(req.useragent.isMobile || req.useragent.isTablet));

  next();
}
