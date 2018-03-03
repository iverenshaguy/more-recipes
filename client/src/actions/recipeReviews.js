import instance from '../axios';
import { decodeToken, errorHandler } from '../utils';
import { toggleReviewForm } from './ui';
import {
  REVIEW_RECIPE_SUCCESS,
  REVIEW_RECIPE_FAILURE,
  FETCH_REVIEWS_SUCCESS,
  FETCH_REVIEWS_FAILURE,
  SET_REVIEWING,
  UNSET_REVIEWING,
  CLEAR_REVIEW_ERROR
} from './actionTypes';

const reviewRecipeSuccess = payload => ({
  type: REVIEW_RECIPE_SUCCESS,
  payload
});

const reviewRecipeFailure = payload => ({
  type: REVIEW_RECIPE_FAILURE,
  payload
});

const fetchReviewsSuccess = payload => ({
  type: FETCH_REVIEWS_SUCCESS,
  payload
});

const fetchReviewsFailure = payload => ({
  type: FETCH_REVIEWS_FAILURE,
  payload
});

const setReviewing = () => ({
  type: SET_REVIEWING
});

const unsetReviewing = () => ({
  type: UNSET_REVIEWING
});

const clearReviewError = () => ({
  type: CLEAR_REVIEW_ERROR
});

const reviewRecipe = (id, review) => async (dispatch) => {
  try {
    dispatch(setReviewing());

    const response = await instance.post(`/recipes/${id}/reviews`, {
      rating: +review.rating,
      comment: review.comment
    });

    const { decoded } = decodeToken();

    response.data.User = {
      id: decoded.id,
      username: decoded.username,
      profilePic: decoded.profilePic
    };

    dispatch(reviewRecipeSuccess(response.data));
    dispatch(unsetReviewing());
    dispatch(toggleReviewForm());
  } catch (error) {
    const errorResponse = errorHandler(error);

    dispatch(reviewRecipeFailure(errorResponse.response));
    dispatch(unsetReviewing());
  }
};

const fetchReviews = (recipeId, page, limit) => async (dispatch) => {
  try {
    dispatch(setReviewing());

    const response = await instance.get(`/recipes/${recipeId}/reviews?sort=upvotes&order=ascending&page=${page}&limit=${limit}`);

    dispatch(fetchReviewsSuccess(response.data));
    dispatch(unsetReviewing());
  } catch (error) {
    const errorResponse = errorHandler(error);

    dispatch(fetchReviewsFailure(errorResponse.response));
    dispatch(unsetReviewing());
  }
};

export default {
  fetchReviews,
  reviewRecipe,
  clearReviewError,
  setReviewing,
  unsetReviewing,
  fetchReviewsSuccess,
  fetchReviewsFailure,
  reviewRecipeSuccess,
  reviewRecipeFailure
};
