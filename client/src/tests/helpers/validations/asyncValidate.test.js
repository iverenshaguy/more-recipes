import axios from 'axios';
import moxios from 'moxios';
import asyncValidate from '../../../helpers/validations/asyncValidate';

const url = '/api/v1';

const loginAsyncValidate = asyncValidate('login');

const error = {
  email: 'This email is not registered, please signup instead'
};

describe('Async Validation', () => {
  afterAll(() => {
    jest.clearAllMocks();
  });

  beforeEach(() => {
    moxios.install(axios);
  });

  afterEach(() => {
    moxios.uninstall(axios);
  });

  it('rejects with wrong email', async () => {
    moxios.stubRequest(`${url}/users/signin`, {
      status: 422,
      response: {
        errors: {
          email: { msg: 'This email is not registered, please signup instead' }
        }
      },
    }, 5);

    expect.assertions(1);
    try {
      await loginAsyncValidate('email', 'damishaguy@gmail.com');
    } catch (e) {
      expect(e).toEqual(error);
    }
  });

  it('resolve with right email and empty password', async () => {
    moxios.stubRequest(`${url}/users/signin`, {
      status: 422,
      response: {
        errors: {
          password: { msg: 'Password must be specified' }
        }
      },
    }, 5);

    try {
      await loginAsyncValidate('email', 'iverenshaguy@gmail.com');
    } catch (e) {
      expect(e).toBe(null);
    }
  });
});
