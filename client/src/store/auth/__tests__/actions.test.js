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
} from '../actions';

describe('Auth Actions', () => {
  test('authenticating', () => {
    const auth = authenticating();

    expect(auth).toEqual({ type: 'AUTHENTICATING' });
  });

  test('authenticationSuccess', () => {
    const data = { name: 'Emily' };
    const auth = authenticationSuccess(data);

    expect(auth).toEqual({ type: 'AUTHENTICATED', payload: { name: 'Emily' } });
  });

  test('authenticationFailure', () => {
    const auth = authenticationFailure('error');

    expect(auth).toEqual({ type: 'AUTHENTICATION_ERROR', payload: 'error' });
  });

  test('loginSuccess', () => {
    const data = { name: 'Emily' };
    const auth = loginSuccess(data);

    expect(auth).toEqual({ type: 'LOGIN_SUCCESS', payload: { name: 'Emily' } });
  });

  test('loginFailure', () => {
    const auth = loginFailure('error');

    expect(auth).toEqual({ type: 'LOGIN_ERROR', payload: 'error' });
  });

  test('signupSuccess', () => {
    const data = { name: 'Emily' };
    const auth = signupSuccess(data);

    expect(auth).toEqual({ type: 'SIGNUP_SUCCESS', payload: { name: 'Emily' } });
  });

  test('signupFailure', () => {
    const auth = signupFailure('error');

    expect(auth).toEqual({ type: 'SIGNUP_ERROR', payload: 'error' });
  });

  test('clearAuthError', () => {
    const auth = clearAuthError();

    expect(auth).toEqual({ type: 'CLEAR_AUTH_ERROR' });
  });

  test('resetUser', () => {
    const auth = resetUser();

    expect(auth).toEqual({ type: 'UNAUTHENTICATED' });
  });
});

