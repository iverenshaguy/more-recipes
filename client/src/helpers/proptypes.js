import PropTypes from 'prop-types';
import { arrayToObject } from '../utils';
import formHelpers from './formHelpers';

const { formFields } = formHelpers;

const authPropTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  location: PropTypes.shape({
    hash: PropTypes.string,
    key: PropTypes.string,
    pathname: PropTypes.string,
    search: PropTypes.string,
    state: PropTypes.shape({
      from: PropTypes.shape({
        hash: PropTypes.string,
        key: PropTypes.string,
        pathname: PropTypes.string,
        search: PropTypes.string
      })
    })
  }).isRequired
};

const formPropTypes = type => ({
  type: PropTypes.string.isRequired,
  state: PropTypes.shape({
    values: PropTypes.shape(arrayToObject(formFields[type], PropTypes.string)),
    touched: PropTypes.shape(arrayToObject(formFields[type], PropTypes.bool)),
    error: PropTypes.shape(arrayToObject(formFields[type], PropTypes.string)),
    pristine: PropTypes.bool,
    formValid: PropTypes.bool,
    asyncValidating: PropTypes.bool
  }).isRequired,
  handlers: PropTypes.shape({
    handleBlur: PropTypes.func,
    handleChange: PropTypes.func,
    handleFocus: PropTypes.func,
    handleSubmit: PropTypes.func,
  }).isRequired
});

const recipePropTypes = PropTypes.shape({
  id: PropTypes.number,
  recipeName: PropTypes.string,
  recipeImage: PropTypes.string,
  prepTime: PropTypes.string,
  cookTime: PropTypes.string,
  totalTime: PropTypes.string,
  difficulty: PropTypes.string,
  extraInfo: PropTypes.string,
  vegetarian: PropTypes.bool,
  ingredients: PropTypes.array,
  preparations: PropTypes.array,
  directions: PropTypes.array,
  upvotes: PropTypes.number,
  downvotes: PropTypes.number,
  views: PropTypes.number,
  createdAt: PropTypes.string,
  updatedAt: PropTypes.string,
  userId: PropTypes.number,
  rating: PropTypes.string
}).isRequired;

const singleRecipePropTypes = {
  recipe: recipePropTypes
};

const multiRecipePropTypes = {
  recipes: PropTypes.arrayOf(recipePropTypes).isRequired,
  metadata: PropTypes.shape({
    firstPage: PropTypes.number,
    lastPage: PropTypes.number,
    page: PropTypes.number,
    itemsPerPage: PropTypes.number,
    pages: PropTypes.arrayOf(PropTypes.number),
    totalCount: PropTypes.number,
  }).isRequired,
};

const renderFormFieldPropTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  required: PropTypes.bool.isRequired,
  label: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  meta: PropTypes.shape({
    touched: PropTypes.bool,
    error: PropTypes.any,
    asyncValidating: PropTypes.any
  }).isRequired,
  handleChange: PropTypes.func.isRequired,
  handleBlur: PropTypes.func.isRequired,
  handleFocus: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired
};

export default {
  authPropTypes,
  formPropTypes,
  multiRecipePropTypes,
  singleRecipePropTypes,
  renderFormFieldPropTypes
};
