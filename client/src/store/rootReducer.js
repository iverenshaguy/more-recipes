import { combineReducers } from 'redux';
import auth from './auth';
import location from './location';
import components from './components';

export default combineReducers({
  auth,
  location,
  components
});
