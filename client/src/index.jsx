import React from 'react';
import { render } from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import jwt from 'jsonwebtoken';
import rootReducer, { composedEnhancers } from './store';
import { authOperations } from './store/auth';
import App from './components/App';

const store = createStore(rootReducer, composedEnhancers);
const { resetUser, authenticateUser } = authOperations;

if (localStorage.jwtToken) {
  const token = localStorage.getItem('jwtToken');
  const { exp } = jwt.decode(token);

  // if token is expired or unavailable
  if (token === '' || exp < Math.floor(Date.now() / 1000)) {
    // remove empty token and log user out
    localStorage.removeItem('jwtToken');
    store.dispatch(resetUser());
  } else {
    // fetch user from token if valid
    store.dispatch(authenticateUser(token));
  }
} else {
  store.dispatch(resetUser());
}

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

if (module.hot && process.env.NODE_ENV !== 'production') {
  module.hot.accept();
}
