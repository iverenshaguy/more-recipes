import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import createHistory from 'history/createBrowserHistory';
import ui from './ui';
import auth from './auth';
import recipes from './recipes';
import isFetching from './isFetching';
import singleRecipe from './singleRecipe';
import uploadImage from './uploadImage';

export const history = createHistory();

export default combineReducers({
  ui,
  auth,
  recipes,
  isFetching,
  singleRecipe,
  uploadImage,
  router: routerReducer
});
