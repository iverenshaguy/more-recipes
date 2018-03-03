import { TOGGLE_MODAL, TOGGLE_REVIEW_FORM } from './actionTypes';

const toggleModal = modal => ({
  type: TOGGLE_MODAL,
  payload: modal || null
});


const toggleReviewForm = () => ({
  type: TOGGLE_REVIEW_FORM
});

export default {
  toggleModal,
  toggleReviewForm
};
