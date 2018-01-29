import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import createHistory from 'history/createBrowserHistory';
import auth from './auth';
import location from './location';
import ui from './ui';
import isFetching from './isFetching';
import recipes from './recipes';

export const history = createHistory();

export default combineReducers({
  ui,
  auth,
  recipes,
  location,
  isFetching,
  router: routerReducer
});
