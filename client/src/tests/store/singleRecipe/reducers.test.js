import reducer from '../../../reducers/singleRecipe';

const state = {
  recipe: {
    error: null, favoriting: false, item: {}, voting: false
  },
  recipeReviews: {
    addReviewSuccess: false, error: null, metadata: {}, reviewing: false, reviews: []
  }
};

const singleRecipePayload = {
  id: 2,
  recipeName: 'Jollof Rice'
};

const payload = {
  message: 'Your Recipe has been Added to Favorites',
  recipe: {
    id: 2,
    recipeName: 'Jollof Rice'
  }
};

describe('Single Recipe Reducers', () => {
  it('should return initial State', () => {
    const newState = reducer(undefined, {});

    expect(newState).toEqual(state);
  });

  it('should handle SET_VOTING action', () => {
    const newState = reducer(state, {
      type: 'SET_VOTING',
    });

    expect(newState).toEqual({ ...state, recipe: { ...state.recipe, voting: true } });
  });

  it('should handle UNSET_VOTING action', () => {
    const newState = reducer({ ...state, recipe: { ...state.recipe, voting: true } }, {
      type: 'UNSET_VOTING',
    });

    expect(newState).toEqual({ ...state, recipe: { ...state.recipe, voting: false } });
  });

  it('should handle SET_FAVORITING action', () => {
    const newState = reducer(state, {
      type: 'SET_FAVORITING',
    });

    expect(newState).toEqual({ ...state, recipe: { ...state.recipe, favoriting: true } });
  });

  it('should handle UNSET_FAVORITING action', () => {
    const newState = reducer({ ...state, recipe: { ...state.recipe, favoriting: true } }, {
      type: 'UNSET_FAVORITING',
    });

    expect(newState).toEqual({ ...state, recipe: { ...state.recipe, favoriting: false } });
  });

  it('should handle FETCH_RECIPE_SUCCESS action', () => {
    const newState = reducer(state, {
      type: 'FETCH_RECIPE_SUCCESS',
      payload: singleRecipePayload
    });

    expect(newState).toEqual({
      ...state,
      recipe: {
        ...state.recipe,
        item: singleRecipePayload,
        error: null,
        favoriting: false,
        voting: false
      }
    });
  });

  it('should handle VOTE_RECIPE_SUCCESS action', () => {
    const newState = reducer(state, {
      type: 'VOTE_RECIPE_SUCCESS',
      payload
    });

    expect(newState).toEqual({
      ...state,
      recipe: {
        ...state.recipe,
        item: payload.recipe,
        error: null,
        favoriting: false,
        voting: false
      }
    });
  });

  it('should handle ADD_RECIPE_TO_FAVORITES_SUCCESS action', () => {
    const newState = reducer(state, {
      type: 'ADD_RECIPE_TO_FAVORITES_SUCCESS',
      payload
    });

    expect(newState).toEqual({
      ...state,
      recipe: {
        ...state.recipe,
        item: payload.recipe,
        error: null,
        favoriting: false,
        voting: false
      }
    });
  });

  it('should handle FETCH_RECIPE_FAILURE action', () => {
    const newState = reducer(state, {
      type: 'FETCH_RECIPE_FAILURE',
      payload: 'Error'
    });

    expect(newState).toEqual({ ...state, recipe: { ...state.recipe, error: 'Error' } });
  });

  it('should handle VOTE_RECIPE_FAILURE action', () => {
    const newState = reducer(state, {
      type: 'VOTE_RECIPE_FAILURE',
      payload: 'Error'
    });

    expect(newState).toEqual({ ...state, recipe: { ...state.recipe, error: 'Error' } });
  });

  it('should handle ADD_RECIPE_TO_FAVORITES_FAILURE action', () => {
    const newState = reducer(state, {
      type: 'ADD_RECIPE_TO_FAVORITES_FAILURE',
      payload: 'Error'
    });

    expect(newState).toEqual({ ...state, recipe: { ...state.recipe, error: 'Error' } });
  });
});
