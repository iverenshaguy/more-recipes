import reducer from '../reducers';

const state = {
  modals: {
    isOpen: false,
    type: null
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
      modals: {
        isOpen: false,
        type: null
      }
    });
  });
});
