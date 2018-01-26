import decodeToken from './decodeToken';
import { authOperations } from '../store/auth';

const { resetUser, authenticateUser } = authOperations;

/**
 * Refreshes page with token in local storage
 * @function refreshPage
 * @param {store} store - store
 * @returns {nothing} returns nothing
 */
const refreshPage = (store) => {
  if (localStorage.jwtToken) {
    const { exp, token } = decodeToken();
    // if token is expired
    if (exp < Math.floor(Date.now() / 1000)) {
      // remove empty token and log user out
      localStorage.removeItem('jwtToken');
      store.dispatch(resetUser());
    } else {
      // fetch user from token if valid
      store.dispatch(authenticateUser(token));
    }
  } else {
    store.dispatch(resetUser());
  }
};

export default refreshPage;
