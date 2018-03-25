import { combineReducers } from 'redux';
import recipeReviews from './recipeReviews';
import {
  SET_VOTING,
  UNSET_VOTING,
  SET_ADDING,
  UNSET_ADDING,
  SET_FAVORITING,
  UNSET_FAVORITING,
  CLEAR_RECIPE_ERROR,
  ADD_RECIPE_SUCCESS,
  ADD_RECIPE_FAILURE,
  VOTE_RECIPE_SUCCESS,
  VOTE_RECIPE_FAILURE,
  FETCH_RECIPE_SUCCESS,
  FETCH_RECIPE_FAILURE,
  ADD_RECIPE_TO_FAVORITES_SUCCESS,
  ADD_RECIPE_TO_FAVORITES_FAILURE,
} from '../actions/actionTypes';

const initialState = {
  item: {},
  error: null,
  adding: false,
  voting: false,
  favoriting: false,
};

const recipe = (state = initialState, action) => {
  switch (action.type) {
    case SET_ADDING:
      return Object.assign({}, state, { adding: true });
    case UNSET_ADDING:
      return Object.assign({}, state, { adding: false });
    case SET_FAVORITING:
      return Object.assign({}, state, { favoriting: true });
    case UNSET_FAVORITING:
      return Object.assign({}, state, { favoriting: false });
    case SET_VOTING:
      return Object.assign({}, state, { voting: true });
    case UNSET_VOTING:
      return Object.assign({}, state, { voting: false });
    case ADD_RECIPE_SUCCESS:
    case FETCH_RECIPE_SUCCESS:
      return Object.assign({}, state, { item: action.payload });
    case VOTE_RECIPE_SUCCESS:
    case ADD_RECIPE_TO_FAVORITES_SUCCESS:
      return Object.assign({}, state, { item: action.payload.recipe });
    case VOTE_RECIPE_FAILURE:
    case ADD_RECIPE_FAILURE:
    case FETCH_RECIPE_FAILURE:
    case ADD_RECIPE_TO_FAVORITES_FAILURE:
      return Object.assign({}, state, { error: action.payload });
    case CLEAR_RECIPE_ERROR:
      return Object.assign({}, state, { error: null });
    default:
      return state;
  }
};

export default combineReducers({
  recipe,
  recipeReviews
});
