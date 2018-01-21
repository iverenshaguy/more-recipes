// import { checkStatus, parseJSON } from './helpers';

// const url = 'https://localhost:8000/api/v1/';

// export const getTodos = () => {
//   return fetch(`${url}`, {
//     accept: 'application/json'
//   })
//     .then(checkStatus)
//     .then(parseJSON);
// };

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
