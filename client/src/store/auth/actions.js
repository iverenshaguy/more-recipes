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
} from './types';

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

export default {
  authenticating,
  authenticationSuccess,
  authenticationFailure,
  loginSuccess,
  loginFailure,
  signupSuccess,
  signupFailure,
  clearAuthError,
  resetUser
};
