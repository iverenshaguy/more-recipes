import { toggleModal, toggleReviewForm, changeRecipeFormState } from '../../../actions/ui';

describe('Component Actions', () => {
  test('toggleModal with modal type', () => {
    const modal = toggleModal('modal');

    expect(modal).toEqual({ type: 'TOGGLE_MODAL', payload: 'modal' });
  });

  test('toggleModal with null modal', () => {
    const modal = toggleModal();

    expect(modal).toEqual({ type: 'TOGGLE_MODAL', payload: null });
  });

  test('toggleReviewForm', () => {
    const form = toggleReviewForm();

    expect(form).toEqual({ type: 'TOGGLE_REVIEW_FORM' });
  });

  test('toggleReviewForm', () => {
    const form = changeRecipeFormState('two');

    expect(form).toEqual({ type: 'CHANGE_RECIPE_FORM_STATE', payload: 'two' });
  });
});

