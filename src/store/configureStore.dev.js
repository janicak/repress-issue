import { createStore, applyMiddleware, compose } from 'redux';

import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
import history from './routerHistory';
import { routerMiddleware } from 'react-router-redux'

import rootReducer from '../reducers';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const configureStore = preloadedState => {
  const store = createStore(
    rootReducer,
    preloadedState,
    composeEnhancers(
      applyMiddleware(routerMiddleware(history), thunk, createLogger())
    )
  );

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers', () => {
      store.replaceReducer(rootReducer);
    });
  }

  return store
};

export default configureStore;
