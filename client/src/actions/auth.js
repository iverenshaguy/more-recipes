import instance from '../axios';
import { errorHandler } from '../utils';
import { api } from '../services';
import {
  AUTHENTICATED,
  UNAUTHENTICATED,
  AUTHENTICATION_ERROR,
  AUTHENTICATING,
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  SIGNUP_SUCCESS,
  SIGNUP_ERROR,
  CLEAR_AUTH_ERROR
} from './actionTypes';

const { userApi } = api;

const authenticating = () => ({
  type: AUTHENTICATING
});

const authenticationSuccess = data => ({
  type: AUTHENTICATED,
  payload: data
});

const authenticationFailure = error => ({
  type: AUTHENTICATION_ERROR,
  payload: error
});

const loginSuccess = data => ({
  type: LOGIN_SUCCESS,
  payload: data
});

const loginFailure = error => ({
  type: LOGIN_ERROR,
  payload: error
});

const signupSuccess = data => ({
  type: SIGNUP_SUCCESS,
  payload: data
});

const signupFailure = error => ({
  type: SIGNUP_ERROR,
  payload: error
});

const clearAuthError = () => ({
  type: CLEAR_AUTH_ERROR
});

const resetUser = () => ({
  type: UNAUTHENTICATED
});

const login = user => async (dispatch) => {
  try {
    dispatch(authenticating());

    const response = await userApi.login(user);

    localStorage.setItem('jwtToken', response.data.token);

    dispatch(loginSuccess(response.data.user));
  } catch (error) {
    const errorResponse = errorHandler(error);

    dispatch(loginFailure(errorResponse.response));
  }
};

const signup = user => async (dispatch) => {
  try {
    dispatch(authenticating());

    const response = await userApi.signup(user);

    localStorage.setItem('jwtToken', response.data.token);

    dispatch(signupSuccess(response.data.user));
  } catch (error) {
    const errorResponse = errorHandler(error);

    dispatch(signupFailure(errorResponse.response));
  }
};

const authenticateUser = () => async (dispatch) => {
  try {
    dispatch(authenticating());

    const res = await instance.get('/users/token');

    localStorage.setItem('jwtToken', res.data.token);

    dispatch(authenticationSuccess(res.data.user));
  } catch (error) {
    const errorResponse = errorHandler(error);

    localStorage.removeItem('jwtToken');

    dispatch(authenticationFailure(errorResponse.response));
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
