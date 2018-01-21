import { combineReducers } from 'redux';
// import { routerReducer } from 'react-router-redux';
import auth from './auth';
import location from './location';
import components from './components';
// import users from './users';

export default combineReducers({
  auth,
  location,
  components,
  // router: routerReducer
});
