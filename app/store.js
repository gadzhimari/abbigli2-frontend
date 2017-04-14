import { createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducers from './reducers';
import { IS_DEVELOPMENT } from './config';

let preloadedState;

if (typeof window !== 'undefined' && window.PRELOADED_STATE) {
  preloadedState = JSON.parse(decodeURI(window.PRELOADED_STATE));
} else {
  preloadedState = {};
}

const configureStore = () => {
  const store = createStore(
    reducers,
    preloadedState,
    compose(
      applyMiddleware(thunk),
      (IS_DEVELOPMENT && window.devToolsExtension) ? window.devToolsExtension() : f => f
    )
  );

  return store;
};

export default configureStore;
