import instance from '../axios';
import { errorHandler } from '../utils';
import { setFetching, unsetFetching } from './isFetching';
import {
  ADD_RECIPE_TO_FAVORITES_SUCCESS,
  ADD_RECIPE_TO_FAVORITES_FAILURE,
  FETCH_FAVORITE_RECIPES_SUCCESS,
  FETCH_FAVORITE_RECIPES_FAILURE,
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

const fetchFavoriteRecipesSuccess = payload => ({
  type: FETCH_FAVORITE_RECIPES_SUCCESS,
  payload
});

const fetchFavoriteRecipesFailure = payload => ({
  type: FETCH_FAVORITE_RECIPES_FAILURE,
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

const fetchFavoriteRecipes = userId => async (dispatch) => {
  try {
    dispatch(setFetching());

    const response = await instance.get(`/users/${userId}/recipes`);

    dispatch(fetchFavoriteRecipesSuccess(response.data));
    dispatch(unsetFetching());
  } catch (error) {
    const errorResponse = errorHandler(error);

    dispatch(fetchFavoriteRecipesFailure(errorResponse.response));
    dispatch(unsetFetching());
  }
};

export default {
  setFavoriting,
  unsetFavoriting,
  fetchFavoriteRecipes,
  addRecipeToFavorites,
  fetchFavoriteRecipesSuccess,
  fetchFavoriteRecipesFailure,
  addRecipeToFavoritesSuccess,
  addRecipeToFavoritesFailure
};
