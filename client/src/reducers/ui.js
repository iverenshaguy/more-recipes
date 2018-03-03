import { TOGGLE_MODAL, TOGGLE_REVIEW_FORM } from '../actions/actionTypes';

const initialState = {
  modals: {
    isOpen: false,
    type: null
  },
  reviewForm: {
    isOpen: false
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
    default:
      return state;
  }
};
