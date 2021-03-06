import reducer from '../../../reducers/recipes';

const state = {
  items: [],
  error: null,
  metadata: {}
};

const recipesPayload = {
  items: [{ id: 1, recipeName: 'Rice' }, { id: 5, recipeName: 'Beans' }],
  metadata: {
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
      items: recipesPayload.recipes,
      metadata: recipesPayload.metadata,
      error: null
    });
  });

  it('should handle RECEIVE_SEARCH_RESULTS_SUCCESS action', () => {
    const newState = reducer(state, {
      type: 'RECEIVE_SEARCH_RESULTS_SUCCESS',
      payload: recipesPayload
    });

    expect(newState).toEqual({
      items: recipesPayload.recipes,
      metadata: recipesPayload.metadata,
      error: null
    });
  });

  it('should handle RECEIVE_USER_RECIPES_SUCCESS action', () => {
    const newState = reducer(state, {
      type: 'RECEIVE_USER_RECIPES_SUCCESS',
      payload: recipesPayload
    });

    expect(newState).toEqual({
      items: recipesPayload.recipes,
      metadata: recipesPayload.metadata,
      error: null
    });
  });

  it('should handle RECEIVE_FAVORITE_RECIPES_SUCCESS action', () => {
    const newState = reducer(state, {
      type: 'RECEIVE_FAVORITE_RECIPES_SUCCESS',
      payload: recipesPayload
    });

    expect(newState).toEqual({
      items: recipesPayload.recipes,
      metadata: recipesPayload.metadata,
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

  it('should handle RECEIVE_FAVORITE_RECIPES_FAILURE action', () => {
    const newState = reducer(state, {
      type: 'RECEIVE_FAVORITE_RECIPES_FAILURE',
      payload: 'Error'
    });

    expect(newState).toEqual({ ...state, error: 'Error' });
  });

  it('should handle RECEIVE_USER_RECIPES_FAILURE action', () => {
    const newState = reducer(state, {
      type: 'RECEIVE_USER_RECIPES_FAILURE',
      payload: 'Error'
    });

    expect(newState).toEqual({ ...state, error: 'Error' });
  });
});
