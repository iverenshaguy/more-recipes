import {
  toggleModal, toggleReviewForm
} from '../../../actions/ui';

describe('Component Actions', () => {
  test('toggleModal with modal type', () => {
    const modal = toggleModal('addRecipe');

    expect(modal).toEqual({ type: 'TOGGLE_MODAL', payload: 'addRecipe' });
  });

  test('toggleModal with null modal', () => {
    const modal = toggleModal();

    expect(modal).toEqual({ type: 'TOGGLE_MODAL', payload: null });
  });

  test('toggleReviewForm', () => {
    const form = toggleReviewForm();

    expect(form).toEqual({ type: 'TOGGLE_REVIEW_FORM' });
  });
});

