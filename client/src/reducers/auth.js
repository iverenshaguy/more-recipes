import {
  AUTHENTICATED,
  AUTHENTICATING,
  UNAUTHENTICATED,
  AUTHENTICATION_ERROR,
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  SIGNUP_SUCCESS,
  SIGNUP_ERROR,
  CLEAR_AUTH_ERROR,
  UPDATE_USER_IMAGE_SUCCESS,
  UPDATE_USER_IMAGE_FAILURE
} from '../actions/actionTypes';

const initialState = {
  isAuthenticated: !!localStorage.getItem('jwtToken'),
  error: null,
  user: {},
  loading: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case AUTHENTICATING:
      return Object.assign({}, state, { loading: true });
    case AUTHENTICATED:
    case LOGIN_SUCCESS:
    case SIGNUP_SUCCESS:
    case UPDATE_USER_IMAGE_SUCCESS:
      return Object.assign({}, state, {
        isAuthenticated: true,
        user: action.payload,
        error: null,
        loading: false
      });
    case UNAUTHENTICATED:
    case CLEAR_AUTH_ERROR:
      return Object.assign({}, state, {
        isAuthenticated: false,
        error: null,
        loading: false
      });
    case AUTHENTICATION_ERROR:
    case LOGIN_ERROR:
    case SIGNUP_ERROR:
      return Object.assign({}, state, {
        isAuthenticated: false,
        user: {},
        error: action.payload,
        loading: false
      });
    case UPDATE_USER_IMAGE_FAILURE:
      return Object.assign({}, state, {
        error: action.payload,
        loading: false
      });
    default:
      return state;
  }
};
