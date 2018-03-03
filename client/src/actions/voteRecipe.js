import instance from '../axios';
import { errorHandler } from '../utils';
import {
  SET_VOTING,
  UNSET_VOTING,
  VOTE_RECIPE_SUCCESS,
  VOTE_RECIPE_FAILURE,
} from './actionTypes';

const voteRecipeSuccess = payload => ({
  type: VOTE_RECIPE_SUCCESS,
  payload
});

const voteRecipeFailure = payload => ({
  type: VOTE_RECIPE_FAILURE,
  payload
});

const setVoting = () => ({
  type: SET_VOTING
});

const unsetVoting = () => ({
  type: UNSET_VOTING
});

const voteRecipe = (id, type) => async (dispatch) => {
  try {
    dispatch(setVoting());

    const response = await instance.post(`/recipes/${id}/${type}votes`);

    dispatch(voteRecipeSuccess(response.data));
    dispatch(unsetVoting());
  } catch (error) {
    const errorResponse = errorHandler(error);

    dispatch(voteRecipeFailure(errorResponse.response));
    dispatch(unsetVoting());
  }
};

export default {
  setVoting,
  unsetVoting,
  voteRecipe,
  voteRecipeSuccess,
  voteRecipeFailure
};
