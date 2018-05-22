import { push } from 'react-router-redux';
import instance from '../axios';
import { setFetching, unsetFetching } from './isFetching';
import { setUploading, unsetUploading } from './uploadImage';
import { errorHandler, createRecipeResponseObj } from '../utils';
import {
  SET_ADDING,
  UNSET_ADDING,
  CLEAR_RECIPE_ERROR,
  ADD_RECIPE_SUCCESS,
  ADD_RECIPE_FAILURE,
  FETCH_RECIPE_SUCCESS,
  FETCH_RECIPE_FAILURE,
  UPDATE_RECIPE_IMAGE_SUCCESS,
  UPDATE_RECIPE_IMAGE_FAILURE,
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

const updateRecipeImageSuccess = recipe => ({
  type: UPDATE_RECIPE_IMAGE_SUCCESS,
  payload: recipe
});

const updateRecipeImageFailure = error => ({
  type: UPDATE_RECIPE_IMAGE_FAILURE,
  payload: error
});

const fetchRecipeSuccess = payload => ({
  type: FETCH_RECIPE_SUCCESS,
  payload
});

const fetchRecipeFailure = payload => ({
  type: FETCH_RECIPE_FAILURE,
  payload
});

const addRecipe = recipe => async (dispatch) => {
  try {
    dispatch(setAdding());

    const response = await instance.post('/recipes', recipe);

    dispatch(addRecipeSuccess(createRecipeResponseObj(response.data)));
    dispatch(unsetAdding());
    dispatch(push(`/recipes/${response.data.id}`));
  } catch (error) {
    const errorResponse = errorHandler(error);

    dispatch(addRecipeFailure(errorResponse.response));
    dispatch(unsetAdding());
  }
};

const updateRecipeImage = (recipeImage, recipeId, uploadTask) => async (dispatch) => {
  try {
    dispatch(setUploading());

    const response = await instance.put(`/recipes/${recipeId}`, { recipeImage });

    dispatch(updateRecipeImageSuccess(response.data));
    dispatch(unsetUploading());
  } catch (error) {
    const errorResponse = errorHandler(error);

    // delete image from firebase if there's an upload task
    if (uploadTask) uploadTask.delete();
    dispatch(updateRecipeImageFailure(errorResponse.response));
    dispatch(unsetUploading());
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
  updateRecipeImage,
  fetchSingleRecipe,
  fetchRecipeSuccess,
  fetchRecipeFailure,
  updateRecipeImageSuccess,
  updateRecipeImageFailure,
};
