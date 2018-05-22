import PropTypes from 'prop-types';
import { arrayToObject } from '../utils';
import formHelpers from './formHelpers';

const { formFields } = formHelpers;

const userPropTypes = {
  user: PropTypes.shape({
    id: PropTypes.number,
    firstname: PropTypes.string,
    lastname: PropTypes.string,
    username: PropTypes.string,
    email: PropTypes.string,
    passwordHash: PropTypes.string,
    aboutMe: PropTypes.string,
    occupation: PropTypes.string,
    profilePic: PropTypes.string,
    coverPhoto: PropTypes.string,
    createdAt: PropTypes.string,
    updatedAt: PropTypes.string
  }).isRequired
};

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

const urlMatchPropTypes = {
  match: PropTypes.shape({
    url: PropTypes.string,
    path: PropTypes.string,
    isExact: PropTypes.bool,
    params: PropTypes.any
  }).isRequired,
};

const formPropTypes = type => ({
  type: PropTypes.string.isRequired,
  state: PropTypes.shape({
    values: PropTypes.shape(arrayToObject(formFields[type], PropTypes.string)),
    touched: PropTypes.shape(arrayToObject(formFields[type], PropTypes.bool)),
    error: PropTypes.shape(arrayToObject(formFields[type], PropTypes.string)),
    pristine: PropTypes.bool,
    formValid: PropTypes.bool,
    asyncValidating: PropTypes.bool,
    fieldCount: PropTypes.shape({
      ingredients: PropTypes.number,
      preparations: PropTypes.number,
      directions: PropTypes.number,
    }),
  }).isRequired,
  handlers: PropTypes.shape({
    handleBlur: PropTypes.func,
    handleChange: PropTypes.func,
    handleFocus: PropTypes.func,
    handleSubmit: PropTypes.func,
    handleAddField: PropTypes.func.isRequired,
    handleRemoveField: PropTypes.func.isRequired
  }).isRequired
});

const metadataPropTypes = PropTypes.shape({
  firstPage: PropTypes.number,
  lastPage: PropTypes.number,
  page: PropTypes.number,
  itemsPerPage: PropTypes.number,
  pages: PropTypes.arrayOf(PropTypes.number),
  totalCount: PropTypes.number,
});

const recipePropTypes = {
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
};

const singleRecipePropTypes = {
  recipe: PropTypes.shape(recipePropTypes).isRequired
};

const recipeObjectPropTypes = {
  recipe: PropTypes.shape({
    isReviewed: PropTypes.bool,
    isFavorited: PropTypes.bool,
    vote: PropTypes.bool,
    recipeItem: PropTypes.shape({
      ...recipePropTypes,
      User: PropTypes.shape({
        userId: PropTypes.number,
        username: PropTypes.string,
        profilePic: PropTypes.string
      })
    })
  })
};

const multiRecipePropTypes = {
  recipes: PropTypes.arrayOf(PropTypes.shape(recipePropTypes)).isRequired,
  metadata: metadataPropTypes
};

const reviewPropTypes = PropTypes.shape({
  rating: PropTypes.number.isRequired,
  comment: PropTypes.string.isRequired,
  User: PropTypes.shape({
    userId: PropTypes.number,
    username: PropTypes.string,
    profilePic: PropTypes.string
  })
});

const singleReviewPropTypes = {
  review: reviewPropTypes
};

const multiReviewPropTypes = {
  reviews: PropTypes.arrayOf(reviewPropTypes).isRequired,
  metadata: metadataPropTypes
};

const renderFormFieldPropTypes = {
  id: PropTypes.string.isRequired,
  rows: PropTypes.number,
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  required: PropTypes.bool.isRequired,
  label: PropTypes.string,
  labelClass: PropTypes.string,
  placeholder: PropTypes.string,
  meta: PropTypes.shape({
    touched: PropTypes.bool,
    error: PropTypes.any,
    asyncValidating: PropTypes.any
  }).isRequired,
  handleChange: PropTypes.func.isRequired,
  handleBlur: PropTypes.func.isRequired,
  handleFocus: PropTypes.func.isRequired,
  handleAddField: PropTypes.func,
  handleRemoveField: PropTypes.func,
  value: PropTypes.string.isRequired
};

const uploadPropTypes = {
  uploadImageObj: PropTypes.shape({
    url: PropTypes.string,
    error: PropTypes.string,
    uploading: PropTypes.bool,
    uploadTask: PropTypes.any
  }).isRequired,
  uploadImage: PropTypes.func.isRequired,
  setUploading: PropTypes.func.isRequired,
  uploadSuccess: PropTypes.func.isRequired,
  uploadFailure: PropTypes.func.isRequired,
  unsetUploading: PropTypes.func.isRequired,
  clearUploadError: PropTypes.func.isRequired
};

const uploadImageObjPropTypes = {
  uploadImageObj: PropTypes.shape({
    url: PropTypes.string,
    error: PropTypes.string,
    uploading: PropTypes.bool,
    uploadTask: PropTypes.any
  }).isRequired,
};

export default {
  authPropTypes,
  formPropTypes,
  userPropTypes,
  uploadPropTypes,
  urlMatchPropTypes,
  metadataPropTypes,
  multiRecipePropTypes,
  multiReviewPropTypes,
  singleRecipePropTypes,
  recipeObjectPropTypes,
  singleReviewPropTypes,
  uploadImageObjPropTypes,
  renderFormFieldPropTypes
};
