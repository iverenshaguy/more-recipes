import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { asyncValidate } from '../index';


// This sets the mock adapter on the default instance
const mock = new MockAdapter(axios);
const url = '/api/v1';

mock.onPost(`${url}/users/signin`).reply(422, {
  errors: {
    email: { msg: 'This email is not registered, please signup instead' },
    password: { msg: 'Password must be specified' }
  }
});

const loginAsyncValidate = asyncValidate('login');

const error = {
  email: 'This email is not registered, please signup instead'
};

describe('Async Validation', () => {
  afterAll(() => {
    jest.clearAllMocks();
  });

  test('it rejects with wrong email', async () => {
    mock.onPost(`${url}/users/signin`).reply(422, {
      errors: {
        email: { msg: 'This email is not registered, please signup instead' }
      }
    });

    expect.assertions(1);
    try {
      await loginAsyncValidate('email', 'damishaguy@gmail.com');
    } catch (e) {
      expect(e).toEqual(error);
    }
  });

  test('it rejects with right email and empty password', async () => {
    mock.onPost(`${url}/users/signin`).reply(422, {
      errors: {
        password: { msg: 'Password must be specified' }
      }
    });

    expect.assertions(1);
    try {
      await loginAsyncValidate('email', 'iverenshaguy@gmail.com');
    } catch (e) {
      expect(e).toEqual(error);
    }
  });
});
