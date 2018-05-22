import reducer from '../../../reducers/ui';

const state = {
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

describe('Auth Reducers', () => {
  it('should return initial State', () => {
    const newState = reducer(undefined, {});

    expect(newState).toEqual(state);
  });

  it('should handle TOGGLE_MODAL action with payload', () => {
    const newState = reducer(state, {
      type: 'TOGGLE_MODAL',
      payload: 'addRecipe'
    });

    expect(newState).toEqual({
      ...state,
      modals: {
        isOpen: true,
        type: 'addRecipe'
      }
    });
  });

  it('should handle TOGGLE_MODAL action without payload', () => {
    const newState = reducer({ ...state, modals: { isOpen: true } }, {
      type: 'TOGGLE_MODAL'
    });

    expect(newState).toEqual({
      ...state,
      modals: {
        isOpen: false,
        type: null
      }
    });
  });

  it('should handle TOGGLE_REVIEW_FORM action', () => {
    const newState = reducer({ ...state, reviewForm: { isOpen: true } }, {
      type: 'TOGGLE_REVIEW_FORM'
    });

    expect(newState).toEqual({
      ...state,
      reviewForm: {
        isOpen: false
      }
    });
  });

  it('should handle CHANGE_RECIPE_FORM_STATE action', () => {
    const newState = reducer(state, {
      type: 'CHANGE_RECIPE_FORM_STATE',
      payload: 'two'
    });

    expect(newState).toEqual({
      ...state,
      recipeForm: {
        active: 'two'
      }
    });
  });
});
