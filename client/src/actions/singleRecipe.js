import { push } from 'react-router-redux';
import instance from '../axios';
import { setFetching, unsetFetching } from './isFetching';
import { toggleModal } from './ui';
import { errorHandler, createRecipeResponseObj } from '../utils';
import {
  SET_ADDING,
  UNSET_ADDING,
  CLEAR_RECIPE_ERROR,
  ADD_RECIPE_SUCCESS,
  ADD_RECIPE_FAILURE,
  FETCH_RECIPE_SUCCESS,
  FETCH_RECIPE_FAILURE
} from './actionTypes';

const setAdding = () => ({
  type: SET_ADDING
});

const unsetAdding = () => ({
  type: UNSET_ADDING
});

const clearRecipeError = () => ({
  type: CLEAR_RECIPE_ERROR
});

const addRecipeSuccess = payload => ({
  type: ADD_RECIPE_SUCCESS,
  payload
});

const addRecipeFailure = payload => ({
  type: ADD_RECIPE_FAILURE,
  payload
});

const fetchRecipeSuccess = payload => ({
  type: FETCH_RECIPE_SUCCESS,
  payload
});

const fetchRecipeFailure = payload => ({
  type: FETCH_RECIPE_FAILURE,
  payload
});

const addRecipe = (recipe, uploadTask) => async (dispatch) => {
  try {
    dispatch(setAdding());

    const response = await instance.post('/recipes', recipe);

    dispatch(addRecipeSuccess(createRecipeResponseObj(response.data)));
    dispatch(unsetAdding());
    dispatch(push(`/recipes/${response.data.id}`));
    dispatch(toggleModal());
  } catch (error) {
    const errorResponse = errorHandler(error);

    // delete image from firebase if there's an upload task
    if (uploadTask) uploadTask.delete();

    dispatch(addRecipeFailure(errorResponse.response));
    dispatch(unsetAdding());
    dispatch(toggleModal());
  }
};

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
  addRecipe,
  setAdding,
  unsetAdding,
  clearRecipeError,
  addRecipeSuccess,
  addRecipeFailure,
  fetchSingleRecipe,
  fetchRecipeSuccess,
  fetchRecipeFailure
};
