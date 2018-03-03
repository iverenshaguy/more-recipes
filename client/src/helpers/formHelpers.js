import { auth, clearAuthError } from '../actions/auth';
import { reviewRecipe, clearReviewError } from '../actions/recipeReviews';

const clearFormError = {
  login: clearAuthError(),
  signup: clearAuthError(),
  review: clearReviewError()
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
  ],
  review: ['rating', 'comment']
};

const requiredFormFields = {
  login: ['email', 'password'],
  signup: [
    'firstname',
    'username',
    'email',
    'password',
    'passwordConfirm'
  ],
  review: ['rating', 'comment']
};

const formSubmitMapper = {
  login: auth('login'),
  signup: auth('signup'),
  review: reviewRecipe
};

export default {
  formFields,
  clearFormError,
  formSubmitMapper,
  requiredFormFields
};
