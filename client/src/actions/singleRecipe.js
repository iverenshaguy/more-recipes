import { push } from 'react-router-redux';
import instance from '../axios';
import { setFetching, unsetFetching } from './isFetching';
import { errorHandler } from '../utils';
import {
  FETCH_RECIPE_SUCCESS,
  FETCH_RECIPE_FAILURE
} from './actionTypes';

const fetchRecipeSuccess = payload => ({
  type: FETCH_RECIPE_SUCCESS,
  payload
});

const fetchRecipeFailure = payload => ({
  type: FETCH_RECIPE_FAILURE,
  payload
});

const fetchSingleRecipe = id => async (dispatch) => {
  try {
    dispatch(setFetching());

    const response = await instance.get(`/recipes/${id}`);
    dispatch(fetchRecipeSuccess(response.data));
    dispatch(unsetFetching());
  } catch (error) {
    const errorResponse = errorHandler(error);

    if (errorResponse.response.recipeId && errorResponse.response.recipeId.msg === 'Recipe Not Found') {
      dispatch(push('/page-not-found'));
    }

    dispatch(fetchRecipeFailure(errorResponse.response));
    dispatch(unsetFetching());
  }
};

export default {
  fetchSingleRecipe,
  fetchRecipeSuccess,
  fetchRecipeFailure
};
