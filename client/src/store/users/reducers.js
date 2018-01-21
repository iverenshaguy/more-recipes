import { AUTHENTICATED, UNAUTHENTICATED, AUTHENTICATION_ERROR } from './types';

export default (state, action) => {
  switch (action.type) {
    case AUTHENTICATED:
      return { ...state, isAuthenticated: true };
    case UNAUTHENTICATED:
      return { ...state, isAuthenticated: false };
    case AUTHENTICATION_ERROR:
      return { ...state, error: action.payload };
    default:
      return state;
  }
};
