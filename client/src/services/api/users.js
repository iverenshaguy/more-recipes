import axios from 'axios';

const url = '/api/v1';

export const auth = type => (user) => {
  const authURL = type === 'login' ? 'signin' : 'signup';

  return axios(`${url}/users/${authURL}`, {
    method: 'POST',
    data: user,
    headers: {
      accept: 'application/json',
      'Content-type': 'application/json; charset=UTF-8'
    },
    validateStatus: status => status >= 200 && status < 300
  });
};

export default { auth };
