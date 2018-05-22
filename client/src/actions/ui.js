import { TOGGLE_MODAL, TOGGLE_REVIEW_FORM, CHANGE_RECIPE_FORM_STATE } from './actionTypes';

const toggleModal = modal => ({
  type: TOGGLE_MODAL,
  payload: modal || null
});


const toggleReviewForm = () => ({
  type: TOGGLE_REVIEW_FORM
});

const changeRecipeFormState = payload => ({
  type: CHANGE_RECIPE_FORM_STATE,
  payload
});

export default {
  toggleModal,
  toggleReviewForm,
  changeRecipeFormState
};
