import axios from 'axios';

const url = '/api/v1';

export const login = user =>
  axios(`${url}/users/signin`, {
    method: 'POST',
    data: user,
    headers: {
      accept: 'application/json',
      'Content-type': 'application/json; charset=UTF-8'
    },
    validateStatus: status => status >= 200 && status < 300
  });

export const signup = user =>
  axios(`${url}/users/signup`, {
    method: 'POST',
    data: user,
    headers: {
      accept: 'application/json',
      'Content-type': 'application/json; charset=UTF-8'
    },
    validateStatus: status => status >= 200 && status < 300
  });

export default { login, signup };
