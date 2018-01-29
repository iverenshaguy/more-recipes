import reducer from '../../../reducers/recipes';

const state = {
  recipes: [],
  error: null,
  metaData: {}
};

const recipesPayload = {
  recipes: [{ id: 1, recipeName: 'Rice' }, { id: 5, recipeName: 'Beans' }],
  metaData: {
    page: 1
  }
};

describe('Recipe Reducers', () => {
  it('should return initial State', () => {
    const newState = reducer(undefined, {});

    expect(newState).toEqual(state);
  });

  it('should handle RECEIVE_TOP_RECIPES_SUCCESS action', () => {
    const newState = reducer(state, {
      type: 'RECEIVE_TOP_RECIPES_SUCCESS',
      payload: recipesPayload
    });

    expect(newState).toEqual({
      recipes: recipesPayload.recipes,
      metaData: recipesPayload.metaData,
      error: null
    });
  });

  it('should handle RECEIVE_SEARCH_RESULTS_SUCCESS action', () => {
    const newState = reducer(state, {
      type: 'RECEIVE_SEARCH_RESULTS_SUCCESS',
      payload: recipesPayload
    });

    expect(newState).toEqual({
      recipes: recipesPayload.recipes,
      metaData: recipesPayload.metaData,
      error: null
    });
  });

  it('should handle RECEIVE_TOP_RECIPES_FAILURE action', () => {
    const newState = reducer(state, {
      type: 'RECEIVE_TOP_RECIPES_FAILURE',
      payload: 'Error'
    });

    expect(newState).toEqual({ ...state, error: 'Error' });
  });

  it('should handle RECEIVE_SEARCH_RESULTS_FAILURE action', () => {
    const newState = reducer(state, {
      type: 'RECEIVE_SEARCH_RESULTS_FAILURE',
      payload: 'Error'
    });

    expect(newState).toEqual({ ...state, error: 'Error' });
  });
});
