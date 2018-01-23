import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import userApi from '../../../services/api/users';
import {
  login as loginMock,
  signup as signupMock
} from '../../../__mocks__/api/users.mock';
import { login, signup, authenticateUser, logout } from '../operations';

userApi.login = jest.fn(loginMock); // eslint-disable-line
userApi.signup = jest.fn(signupMock); // eslint-disable-line

const mock = new MockAdapter(axios);
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
  user: null,
  loading: false
});

describe('Auth Operations', () => {
  afterEach(() => {
    store.clearActions();
    localStorage.clear();
    jest.clearAllMocks();
  });

  it('dispatches AUTHENTICATING and LOGIN_SUCCESS on successful login', () => {
    const expectedActions = ['AUTHENTICATING', 'LOGIN_SUCCESS'];

    return store.dispatch(login({ email: 'iverenshaguy@gmail.com', password: 'iverenshaguy' })).then(() => {
      const dispatchedActions = store.getActions();

      const actionTypes = dispatchedActions.map(action => action.type);


      expect(actionTypes).toEqual(expectedActions);
      expect(localStorage.getItem('jwtToken')).toEqual(token);
    });
  });

  it('dispatches AUTHENTICATING and LOGIN_ERROR on unsuccessful login', () => {
    const expectedActions = ['AUTHENTICATING', 'LOGIN_ERROR'];

    return store.dispatch(login({ email: 'iverenshaguy@gmail.com', password: 'iverenshaguytt' })).catch(() => {
      const dispatchedActions = store.getActions();

      const actionTypes = dispatchedActions.map(action => action.type);


      expect(actionTypes).toEqual(expectedActions);
      expect(localStorage.getItem('jwtToken')).toEqual(undefined);
    });
  });

  it('dispatches AUTHENTICATING and SIGNUP_SUCCESS on successful signup', () => {
    const expectedActions = ['AUTHENTICATING', 'SIGNUP_SUCCESS'];

    return store.dispatch(signup(user)).then(() => {
      const dispatchedActions = store.getActions();

      const actionTypes = dispatchedActions.map(action => action.type);


      expect(actionTypes).toEqual(expectedActions);
      expect(localStorage.getItem('jwtToken')).toEqual(token);
    });
  });

  it('dispatches AUTHENTICATING and SIGNUP_ERROR on unsuccessful signup', () => {
    const expectedActions = ['AUTHENTICATING', 'SIGNUP_ERROR'];

    return store.dispatch(signup({ ...user, email: 'iverenshaguy@gmail.com' })).catch(() => {
      const dispatchedActions = store.getActions();

      const actionTypes = dispatchedActions.map(action => action.type);


      expect(actionTypes).toEqual(expectedActions);
      expect(localStorage.getItem('jwtToken')).toEqual(undefined);
    });
  });

  it('dispatches AUTHENTICATING and AUTHENTICATION_SUCCESS on successful authentication', () => {
    const expectedActions = ['AUTHENTICATING', 'AUTHENTICATED'];

    mock.onGet(`${url}/users/token`).reply(200, { token, user });

    return store.dispatch(authenticateUser(token)).then(() => {
      const dispatchedActions = store.getActions();

      const actionTypes = dispatchedActions.map(action => action.type);


      expect(actionTypes).toEqual(expectedActions);
      expect(localStorage.getItem('jwtToken')).toEqual(token);
      mock.reset();
      mock.restore();
    });
  });

  it('dispatches AUTHENTICATING and AUTHENTICATION_ERROR on unsuccessful authentication', () => {
    const expectedActions = ['AUTHENTICATING', 'AUTHENTICATION_ERROR'];

    mock.onGet(`${url}/users/token`).reply(401, { error: 'Email/Password do not match' });

    return store.dispatch(authenticateUser(token)).catch(() => {
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
    mock.reset();
    mock.restore();
  });
});
