import instance from '../axios';
import { setFetching, unsetFetching } from './isFetching';
import { errorHandler } from '../utils';
import {
  RECEIVE_TOP_RECIPES_SUCCESS,
  RECEIVE_TOP_RECIPES_FAILURE,
  RECEIVE_USER_RECIPES_SUCCESS,
  RECEIVE_USER_RECIPES_FAILURE,
  RECEIVE_SEARCH_RESULTS_SUCCESS,
  RECEIVE_SEARCH_RESULTS_FAILURE,
  RECEIVE_FAVORITE_RECIPES_SUCCESS,
  RECEIVE_FAVORITE_RECIPES_FAILURE,
} from './actionTypes';

const fetchRecipesSuccess = (type, payload) => ({
  type, payload
});

const fetchRecipesFailure = (type, payload) => ({
  type, payload
});

const fetchTopRecipes = (page, limit) => async (dispatch) => {
  try {
    dispatch(setFetching());

    const response = await instance.get(`/recipes?sort=upvotes&order=ascending&page=${page}&limit=${limit}`);

    dispatch(fetchRecipesSuccess(RECEIVE_TOP_RECIPES_SUCCESS, response.data));
    dispatch(unsetFetching());
  } catch (error) {
    const errorResponse = errorHandler(error);

    dispatch(fetchRecipesFailure(RECEIVE_TOP_RECIPES_FAILURE, errorResponse.response));
    dispatch(unsetFetching());
  }
};

const fetchUserRecipes = (id, page, limit) => async (dispatch) => {
  try {
    dispatch(setFetching());

    const response = await instance.get(`users/${id}/recipes/user?page=${page}&limit=${limit}`);

    dispatch(fetchRecipesSuccess(RECEIVE_USER_RECIPES_SUCCESS, response.data));
    dispatch(unsetFetching());
  } catch (error) {
    const errorResponse = errorHandler(error);

    dispatch(fetchRecipesFailure(RECEIVE_USER_RECIPES_FAILURE, errorResponse.response));
    dispatch(unsetFetching());
  }
};

const searchRecipes = (value, page, limit) => async (dispatch) => {
  try {
    dispatch(setFetching());

    const response = await instance.get(`/recipes?search=${value}&page=${page}&limit=${limit}`);

    if (response.data.message && response.data.message === 'Your search returned no results') {
      response.data = {
        recipes: [],
        metadata: {}
      };
    }

    dispatch(fetchRecipesSuccess(RECEIVE_SEARCH_RESULTS_SUCCESS, response.data));
    dispatch(unsetFetching());
  } catch (error) {
    const errorResponse = errorHandler(error);

    dispatch(fetchRecipesFailure(RECEIVE_SEARCH_RESULTS_FAILURE, errorResponse.response));
    dispatch(unsetFetching());
  }
};

const fetchFavoriteRecipes = (userId, page, limit) => async (dispatch) => {
  try {
    dispatch(setFetching());

    const response = await instance.get(`/users/${userId}/recipes?page=${page}&limit=${limit}`);

    dispatch(fetchRecipesSuccess(RECEIVE_FAVORITE_RECIPES_SUCCESS, response.data));
    dispatch(unsetFetching());
  } catch (error) {
    const errorResponse = errorHandler(error);

    dispatch(fetchRecipesFailure(RECEIVE_FAVORITE_RECIPES_FAILURE, errorResponse.response));
    dispatch(unsetFetching());
  }
};

export default {
  searchRecipes,
  fetchTopRecipes,
  fetchUserRecipes,
  fetchRecipesSuccess,
  fetchRecipesFailure,
  fetchFavoriteRecipes,
};
