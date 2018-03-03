import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import axios from 'axios';
import moxios from 'moxios';
import instance from '../../../axios';
import {
  authenticating,
  authenticationSuccess,
  authenticationFailure,
  loginSuccess,
  loginFailure,
  signupSuccess,
  signupFailure,
  clearAuthError,
  resetUser,
  auth as authAction,
  authenticateUser,
  logout
} from '../../../actions/auth';

const url = '/api/v1';
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNTE1NDQ0NzkwLCJleHAiOjE1MTU1MzExOTB9.6d1VznIz8slZFioUzvC4KNGDlz_YsUNy95g2LPaEnJE';

const user = {
  firstname: 'Jane',
  lastname: 'Smithy',
  username: 'janesmithy',
  email: 'janesmithy@gmail.com',
  password: 'janesmithy',
  passwordConfirm: 'janesmithy',
  aboutMe: 'I love books.',
  occupation: 'Web Designer'
};

// configure Mock store
const store = mockStore({
  isAuthenticated: false,
  error: null,
  user: {},
  loading: false
});

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

  describe('Auth Operations', () => {
    afterEach(() => {
      store.clearActions();
      localStorage.clear();
      jest.clearAllMocks();
    });

    describe('Authentication', () => {
      beforeEach(() => {
        moxios.install(axios);
      });

      afterEach(() => {
        moxios.uninstall(axios);
      });

      it('dispatches AUTHENTICATING and LOGIN_SUCCESS on successful login', () => {
        const expectedActions = ['AUTHENTICATING', 'LOGIN_SUCCESS'];

        moxios.stubRequest(`${url}/users/signin`, {
          status: 200,
          response: { user, token }
        }, 5);

        return store.dispatch(authAction('login')({ email: 'iverenshaguy@gmail.com', password: 'iverenshaguy' })).then(() => {
          const dispatchedActions = store.getActions();

          const actionTypes = dispatchedActions.map(action => action.type);


          expect(actionTypes).toEqual(expectedActions);
          expect(localStorage.getItem('jwtToken')).toEqual(token);
        });
      });

      it('dispatches AUTHENTICATING and LOGIN_ERROR on unsuccessful login', () => {
        const expectedActions = ['AUTHENTICATING', 'LOGIN_ERROR'];

        moxios.stubRequest(`${url}/users/signin`, {
          status: 401,
          response: {
            error: 'Email/password do not match'
          },
        }, 5);

        return store.dispatch(authAction('login')({ email: 'iverenshaguy@gmail.com', password: 'iverenshaguytt' })).catch(() => {
          const dispatchedActions = store.getActions();

          const actionTypes = dispatchedActions.map(action => action.type);


          expect(actionTypes).toEqual(expectedActions);
          expect(localStorage.getItem('jwtToken')).toEqual(undefined);
        });
      });

      it('dispatches AUTHENTICATING and SIGNUP_SUCCESS on successful signup', () => {
        const expectedActions = ['AUTHENTICATING', 'SIGNUP_SUCCESS'];

        moxios.stubRequest(`${url}/users/signup`, {
          status: 201,
          response: { user, token }
        }, 5);

        return store.dispatch(authAction('signup')(user)).then(() => {
          const dispatchedActions = store.getActions();

          const actionTypes = dispatchedActions.map(action => action.type);


          expect(actionTypes).toEqual(expectedActions);
          expect(localStorage.getItem('jwtToken')).toEqual(token);
        });
      });

      it('dispatches AUTHENTICATING and SIGNUP_ERROR on unsuccessful signup', () => {
        const expectedActions = ['AUTHENTICATING', 'SIGNUP_ERROR'];

        moxios.stubRequest(`${url}/users/signup`, {
          status: 422,
          response: {
            errors: {
              email: 'This email is already registered'
            }
          }
        }, 5);

        return store.dispatch(authAction('signup')({ ...user, email: 'iverenshaguy@gmail.com' })).catch(() => {
          const dispatchedActions = store.getActions();

          const actionTypes = dispatchedActions.map(action => action.type);


          expect(actionTypes).toEqual(expectedActions);
          expect(localStorage.getItem('jwtToken')).toEqual(undefined);
        });
      });

      it('dispatches UNAUTHENTICATED', () => {
        store.dispatch(logout());

        const expectedActions = ['UNAUTHENTICATED'];

        const dispatchedActions = store.getActions();

        const actionTypes = dispatchedActions.map(action => action.type);


        expect(actionTypes).toEqual(expectedActions);
        expect(localStorage.getItem('jwtToken')).toEqual(undefined);
      });
    });

    describe('Token Refresh', () => {
      beforeEach(() => {
        moxios.install(instance);
      });

      afterEach(() => {
        moxios.uninstall(instance);
      });

      it('dispatches AUTHENTICATING and AUTHENTICATION_SUCCESS on successful authentication', () => {
        const expectedActions = ['AUTHENTICATING', 'AUTHENTICATED'];

        moxios.stubRequest(`${url}/users/token`, {
          status: 200,
          response: { token, user }
        }, 5);

        return store.dispatch(authenticateUser()).then(() => {
          const dispatchedActions = store.getActions();

          const actionTypes = dispatchedActions.map(action => action.type);

          expect(actionTypes).toEqual(expectedActions);
          expect(localStorage.getItem('jwtToken')).toEqual(token);
        });
      });

      it('dispatches AUTHENTICATING and AUTHENTICATION_ERROR on unsuccessful authentication', () => {
        const expectedActions = ['AUTHENTICATING', 'AUTHENTICATION_ERROR'];

        moxios.stubRequest(`${url}/users/token`, {
          status: 500
        }, 5);

        return store.dispatch(authenticateUser()).catch(() => {
          const dispatchedActions = store.getActions();

          const actionTypes = dispatchedActions.map(action => action.type);


          expect(actionTypes).toEqual(expectedActions);
          expect(localStorage.getItem('jwtToken')).toEqual(undefined);
        });
      });
    });
  });
});

