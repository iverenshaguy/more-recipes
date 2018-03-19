import {
  RECEIVE_USER_RECIPES_SUCCESS,
  RECEIVE_USER_RECIPES_FAILURE,
} from '../actions/actionTypes';

const initialState = {
  items: [],
  error: null,
  metadata: {}
};

export default (state = initialState, action) => {
  switch (action.type) {
    case RECEIVE_USER_RECIPES_SUCCESS:
      return Object.assign({}, state, {
        items: action.payload.recipes,
        metadata: action.payload.metadata
      });
    case RECEIVE_USER_RECIPES_FAILURE:
      return Object.assign({}, state, { error: action.payload });
    default:
      return state;
  }
};
