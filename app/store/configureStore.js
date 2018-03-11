import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';

import reducers from '../reducers';

let preloadedState;

if (typeof window !== 'undefined' && window.PRELOADED_STATE) {
  preloadedState = JSON.parse(window.PRELOADED_STATE);
} else {
  preloadedState = {};
}

const configureStore = (logger) => {
  const store = createStore(
    reducers,
    preloadedState,
    composeWithDevTools(applyMiddleware(thunk.withExtraArgument(logger))),
  );
  return store;
};

export default configureStore;
