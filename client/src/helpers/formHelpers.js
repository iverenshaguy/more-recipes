import { login, signup, clearAuthError } from '../actions/auth';

const clearFormError = {
  login: clearAuthError(),
  signup: clearAuthError()
};

const formFields = {
  login: ['email', 'password'],
  signup: [
    'firstname',
    'lastname',
    'username',
    'email',
    'password',
    'passwordConfirm',
    'occupation',
    'aboutMe'
  ]
};

const formSubmitMapper = {
  login,
  signup
};

export default {
  formFields,
  clearFormError,
  formSubmitMapper
};
