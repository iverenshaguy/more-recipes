import instance from '../axios';
import { errorHandler } from '../utils';
import {
  ADD_RECIPE_TO_FAVORITES_SUCCESS,
  ADD_RECIPE_TO_FAVORITES_FAILURE,
  SET_FAVORITING,
  UNSET_FAVORITING
} from './actionTypes';

const addRecipeToFavoritesSuccess = payload => ({
  type: ADD_RECIPE_TO_FAVORITES_SUCCESS,
  payload
});

const addRecipeToFavoritesFailure = payload => ({
  type: ADD_RECIPE_TO_FAVORITES_FAILURE,
  payload
});

const setFavoriting = () => ({
  type: SET_FAVORITING
});

const unsetFavoriting = () => ({
  type: UNSET_FAVORITING
});

const addRecipeToFavorites = id => async (dispatch) => {
  try {
    dispatch(setFavoriting());

    const response = await instance.post(`/recipes/${id}/favorites`);

    dispatch(addRecipeToFavoritesSuccess(response.data));
    dispatch(unsetFavoriting());
  } catch (error) {
    const errorResponse = errorHandler(error);

    dispatch(addRecipeToFavoritesFailure(errorResponse.response));
    dispatch(unsetFavoriting());
  }
};

export default {
  setFavoriting,
  unsetFavoriting,
  addRecipeToFavorites,
  addRecipeToFavoritesSuccess,
  addRecipeToFavoritesFailure
};
