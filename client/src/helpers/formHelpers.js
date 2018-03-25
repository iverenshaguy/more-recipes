import { auth, clearAuthError } from '../actions/auth';
import { reviewRecipe, clearReviewError } from '../actions/recipeReviews';
import { addRecipe, clearRecipeError } from '../actions/singleRecipe';

const clearFormError = {
  login: clearAuthError(),
  signup: clearAuthError(),
  review: clearReviewError(),
  recipe: clearRecipeError()
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
  review: ['rating', 'comment'],
  recipe: [
    'recipeName',
    'recipeImage',
    'prepTime',
    'cookTime',
    'totalTime',
    'difficulty',
    'extraInfo',
    'vegetarian',
    'ingredients',
    'preparations',
    'directions'
  ]
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
  review: ['rating', 'comment'],
  recipe: [
    'recipeName',
    'totalTime',
    'ingredients',
    'directions'
  ],
};

const formSubmitMapper = {
  login: auth('login'),
  signup: auth('signup'),
  review: reviewRecipe,
  addRecipe
};

export default {
  formFields,
  clearFormError,
  formSubmitMapper,
  requiredFormFields
};
