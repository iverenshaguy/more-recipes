import decodeToken from './decodeToken';
import { resetUser, authenticateUser } from '../actions/auth';

/**
 * Refreshes page with token in local storage
 * @function refreshPage
 * @param {store} store - store
 * @returns {nothing} returns nothing
 */
const refreshPage = (store) => {
  if (localStorage.jwtToken) {
    const { exp } = decodeToken();
    // if token is expired
    if (exp < Math.floor(Date.now() / 1000)) {
      // remove empty token and log user out
      localStorage.removeItem('jwtToken');
      store.dispatch(resetUser());
    } else {
      // fetch user from token if valid
      store.dispatch(authenticateUser());
    }
  } else {
    store.dispatch(resetUser());
  }
};

export default refreshPage;
