import { TOGGLE_MODAL } from './actionTypes';

const toggleModal = modal => ({
  type: TOGGLE_MODAL,
  payload: modal || null
});

export default {
  toggleModal
};
