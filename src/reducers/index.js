import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { pages } from './wp_types';

const rootReducer = combineReducers({
  pages: pages.reducer,
  router: routerReducer
});

export default rootReducer;
