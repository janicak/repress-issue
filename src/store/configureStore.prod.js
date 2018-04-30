import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import history from './routerHistory';
import { routerMiddleware } from 'react-router-redux'

import rootReducer from '../reducers';

const configureStore = preloadedState => createStore(
  rootReducer,
  preloadedState,
  applyMiddleware(thunk, routerMiddleware(history))
);

export default configureStore
