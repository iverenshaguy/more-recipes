import {
  SET_REVIEWING,
  UNSET_REVIEWING,
  CLEAR_REVIEW_ERROR,
  REVIEW_RECIPE_SUCCESS,
  REVIEW_RECIPE_FAILURE,
  FETCH_REVIEWS_SUCCESS,
  FETCH_REVIEWS_FAILURE
} from '../actions/actionTypes';

const initialState = {
  reviews: [],
  metadata: {},
  addReviewSuccess: false,
  error: null,
  reviewing: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_REVIEWING:
      return Object.assign({}, state, { reviewing: true });
    case UNSET_REVIEWING:
      return Object.assign({}, state, { reviewing: false });
    case FETCH_REVIEWS_SUCCESS:
      return Object.assign({}, state, {
        reviews: action.payload.reviews, metadata: action.payload.metadata
      });
    case FETCH_REVIEWS_FAILURE:
      return Object.assign({}, state, { error: action.payload });
    case REVIEW_RECIPE_SUCCESS:
      return Object.assign({}, state, {
        addReviewSuccess: true, reviews: [...state.reviews, action.payload]
      });
    case REVIEW_RECIPE_FAILURE:
      return Object.assign({}, state, { addReviewSuccess: false, error: action.payload });
    case CLEAR_REVIEW_ERROR:
      return Object.assign({}, state, { error: null });
    default:
      return state;
  }
};
