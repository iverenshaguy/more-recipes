import { AUTHENTICATED, AUTHENTICATION_ERROR } from './types';

const authenticationSuccess = () => ({
  type: AUTHENTICATED
});

const authenticationFailure = () => ({
  type: AUTHENTICATION_ERROR,
  payload: 'Invalid Email or Password'
});

export default {
  authenticationSuccess,
  authenticationFailure
};
