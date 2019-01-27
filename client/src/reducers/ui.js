import { TOGGLE_MODAL, TOGGLE_REVIEW_FORM, CHANGE_RECIPE_FORM_STATE } from '../actions/actionTypes';

const initialState = {
  modals: {
    isOpen: false,
    type: null
  },
  reviewForm: {
    isOpen: false
  },
  recipeForm: {
    active: 'one'
  }
};

export default (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_MODAL:
      return Object.assign({}, state, {
        modals: {
          isOpen: !state.modals.isOpen,
          type: action.payload || null
        }
      });
    case TOGGLE_REVIEW_FORM:
      return Object.assign({}, state, {
        reviewForm: {
          isOpen: !state.reviewForm.isOpen,
        }
      });
    case CHANGE_RECIPE_FORM_STATE:
      return Object.assign({}, state, {
        recipeForm: {
          active: action.payload
        }
      });
    default:
      return state;
  }
};
