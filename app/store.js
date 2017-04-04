import { createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducers from './reducers';
import { IS_DEVELOPMENT } from './config';

let preloadedState;

if (typeof window !== 'undefined' && window.APP_STATE) {
  preloadedState = window.APP_STATE;
} else {
  preloadedState = {};
}

export default createStore(
  reducers,
  preloadedState,
  compose(
    applyMiddleware(thunk),
    (IS_DEVELOPMENT && window.devToolsExtension) ? window.devToolsExtension() : f => f
  )
);
