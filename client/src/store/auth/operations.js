import {
  authenticating,
  authenticationSuccess,
  authenticationFailure,
  loginSuccess,
  loginFailure,
  signupSuccess,
  signupFailure,
  clearAuthError,
  resetUser
} from './actions';
import { errorHandler } from '../../utils';
import { api } from '../../services';

const { userApi } = api;

const login = user => async (dispatch) => {
  try {
    dispatch(authenticating());

    const response = await userApi.login(user);

    localStorage.setItem('jwtToken', response.data.token);

    dispatch(loginSuccess(response.data));
  } catch (error) {
    const errorResponse = errorHandler(error);

    dispatch(loginFailure(errorResponse.response));
  }
};

const signup = user => async (dispatch) => {
  try {
    const response = await userApi.signup(user);

    localStorage.setItem('jwtToken', response.data.token);

    dispatch(signupSuccess(response.data));
  } catch (error) {
    const errorResponse = errorHandler(error);

    dispatch(signupFailure(errorResponse.response));
  }
};

const authenticateUser = token => async (dispatch) => {
  dispatch(authenticating());

  try {
    const res = await userApi.refreshToken(token);

    localStorage.setItem('jwtToken', res.data.token);
    dispatch(authenticationSuccess(res.data));
  } catch (error) {
    localStorage.removeItem('jwtToken');
    dispatch(resetUser());
  }
};

const logout = () => (dispatch) => {
  localStorage.removeItem('jwtToken');
  dispatch(resetUser());
};

export default {
  login,
  loginSuccess,
  loginFailure,
  signup,
  signupSuccess,
  signupFailure,
  authenticating,
  authenticateUser,
  authenticationSuccess,
  authenticationFailure,
  clearAuthError,
  resetUser,
  logout
};
