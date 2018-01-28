import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import instance from '../../../axios';
import { login, signup, authenticateUser, logout } from '../../../operations/auth';

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
  const mock = new MockAdapter(axios);

  const instanceMock = new MockAdapter(instance);

  afterAll(() => {
    mock.restore();
    instanceMock.restore();
  });

  afterEach(() => {
    store.clearActions();
    localStorage.clear();
    jest.clearAllMocks();
  });

  it('dispatches AUTHENTICATING and LOGIN_SUCCESS on successful login', () => {
    const expectedActions = ['AUTHENTICATING', 'LOGIN_SUCCESS'];

    mock.onPost(`${url}/users/signin`, { email: 'iverenshaguy@gmail.com', password: 'iverenshaguy' }).reply(200, {
      user: {
        id: '1',
        firstname: 'Jane',
        lastname: 'Smith',
        username: 'janesmith',
        email: 'janesmith@gmail.com',
        aboutMe: 'Food lover',
        occupation: 'Chef',
        updatedAt: '2017-10-30T00:47:03.687Z',
        createdAt: '2017-10-30T00:47:03.687Z'
      },
      token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNTE1NDQ0NzkwLCJleHAiOjE1MTU1MzExOTB9.6d1VznIz8slZFioUzvC4KNGDlz_YsUNy95g2LPaEnJE'
    });

    return store.dispatch(login({ email: 'iverenshaguy@gmail.com', password: 'iverenshaguy' })).then(() => {
      const dispatchedActions = store.getActions();

      const actionTypes = dispatchedActions.map(action => action.type);


      expect(actionTypes).toEqual(expectedActions);
      expect(localStorage.getItem('jwtToken')).toEqual(token);
    });
  });

  it('dispatches AUTHENTICATING and LOGIN_ERROR on unsuccessful login', () => {
    const expectedActions = ['AUTHENTICATING', 'LOGIN_ERROR'];

    mock.onPost(`${url}/users/signin`, { email: 'iverenshaguy@gmail.com', password: 'iverenshaguyttt' }).reply(401, {
      error: 'Email/password do not match'
    });

    return store.dispatch(login({ email: 'iverenshaguy@gmail.com', password: 'iverenshaguytt' })).catch(() => {
      const dispatchedActions = store.getActions();

      const actionTypes = dispatchedActions.map(action => action.type);


      expect(actionTypes).toEqual(expectedActions);
      expect(localStorage.getItem('jwtToken')).toEqual(undefined);
    });
  });

  it('dispatches AUTHENTICATING and SIGNUP_SUCCESS on successful signup', () => {
    const expectedActions = ['AUTHENTICATING', 'SIGNUP_SUCCESS'];

    mock.onPost(`${url}/users/signup`, user).reply(201, {
      user,
      token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNTE1NDQ0NzkwLCJleHAiOjE1MTU1MzExOTB9.6d1VznIz8slZFioUzvC4KNGDlz_YsUNy95g2LPaEnJE'
    });

    return store.dispatch(signup(user)).then(() => {
      const dispatchedActions = store.getActions();

      const actionTypes = dispatchedActions.map(action => action.type);


      expect(actionTypes).toEqual(expectedActions);
      expect(localStorage.getItem('jwtToken')).toEqual(token);
    });
  });

  it('dispatches AUTHENTICATING and SIGNUP_ERROR on unsuccessful signup', () => {
    const expectedActions = ['AUTHENTICATING', 'SIGNUP_ERROR'];

    mock.onPost(`${url}/users/signup`, { ...user, email: 'iverenshaguy@gmail.com' }).reply(422, {
      errors: {
        email: 'This email is already registered'
      }
    });

    return store.dispatch(signup({ ...user, email: 'iverenshaguy@gmail.com' })).catch(() => {
      const dispatchedActions = store.getActions();

      const actionTypes = dispatchedActions.map(action => action.type);


      expect(actionTypes).toEqual(expectedActions);
      expect(localStorage.getItem('jwtToken')).toEqual(undefined);
    });
  });

  it('dispatches AUTHENTICATING and AUTHENTICATION_SUCCESS on successful authentication', () => {
    const expectedActions = ['AUTHENTICATING', 'AUTHENTICATED'];

    instanceMock.onGet('/users/token').reply(200, { token, user });

    return store.dispatch(authenticateUser()).then(() => {
      const dispatchedActions = store.getActions();

      const actionTypes = dispatchedActions.map(action => action.type);

      expect(actionTypes).toEqual(expectedActions);
      expect(localStorage.getItem('jwtToken')).toEqual(token);
    });
  });

  it('dispatches AUTHENTICATING and AUTHENTICATION_ERROR on unsuccessful authentication', () => {
    const expectedActions = ['AUTHENTICATING', 'AUTHENTICATION_ERROR'];

    instanceMock.onGet('/users/token').reply(500);

    return store.dispatch(authenticateUser()).catch(() => {
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
