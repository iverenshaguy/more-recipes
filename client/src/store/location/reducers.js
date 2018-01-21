import { HOME, AUTH } from './types';

const initialState = {
  current: 'home'
};

export default (state = initialState, action) => {
  switch (action.type) {
    case HOME:
      return { current: 'home' };
    case AUTH:
      return { current: 'auth' };
    default:
      return state;
  }
};
