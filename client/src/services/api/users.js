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

// export const refreshToken = token =>
//   instance.get(`${url}/users/token`, {
//     method: 'GET',
//     headers: {
//       accept: 'application/json',
//       'Content-type': 'application/json; charset=UTF-8',
//       authorization: token
//     },
//     validateStatus: status => status >= 200 && status < 300
//   });

// export const getTodoItem = id => {
//   return fetch(`${proxyurl}${url}/${id}`, {
//     accept: 'application/json'
//   })
//     .then(checkStatus)
//     .then(parseJSON);
// };

// export const addTodo = todo => {
//   const request = new Request(`${url}`, {
//     method: 'POST',
//     body: JSON.stringify(todo),
//     headers: {
//       accept: 'application/json',
//       'Content-type': 'application/json; charset=UTF-8'
//     }
//   });

//   return fetch(request)
//     .then(checkStatus)
//     .then(parseJSON);
// };

// export const updateTodo = (id, newTodo) => {
//   const request = new Request(`${url}/${id}`, {
//     method: 'PUT',
//     body: JSON.stringify(newTodo),
//     headers: {
//       accept: 'application/json',
//       'Content-type': 'application/json; charset=UTF-8'
//     }
//   });

//   return fetch(request)
//     .then(checkStatus)
//     .then(parseJSON);
// };

// export const deleteTodo = id => {
//   return fetch(`${proxyurl}${url}/${id}`, {
//     method: 'DELETE'
//   }).then(checkStatus);
// };

export default { login, signup };
