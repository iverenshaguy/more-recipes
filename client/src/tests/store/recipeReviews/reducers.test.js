import reducer from '../../../reducers/recipeReviews';

const state = {
  reviews: [],
  metadata: {},
  addReviewSuccess: false,
  error: null,
  reviewing: false
};

const reviewsPayload = {
  reviews: [{ id: 1, rating: 3, comment: '' }, { id: 2, rating: 5, comment: 'Nice Recipe' }],
  metadata: {
    page: 1
  }
};

const reviewRecipePayload = {
  id: 5,
  rating: 5,
  comment: 'Excellent'
};

describe('Recipe Reviews Reducers', () => {
  it('should return initial State', () => {
    const newState = reducer(undefined, {});

    expect(newState).toEqual(state);
  });

  it('should handle SET_REVIEWING action', () => {
    const newState = reducer(state, {
      type: 'SET_REVIEWING',
    });

    expect(newState).toEqual({ ...state, reviewing: true });
  });

  it('should handle UNSET_REVIEWING action', () => {
    const newState = reducer({ ...state, reviewing: true }, {
      type: 'UNSET_REVIEWING',
    });

    expect(newState).toEqual({ ...state, reviewing: false });
  });

  it('should handle CLEAR_REVIEW_ERROR action', () => {
    const newState = reducer(state, {
      type: 'CLEAR_REVIEW_ERROR',
    });

    expect(newState).toEqual({ ...state, error: null });
  });

  it('should handle FETCH_REVIEWS_SUCCESS action', () => {
    const newState = reducer(state, {
      type: 'FETCH_REVIEWS_SUCCESS',
      payload: reviewsPayload
    });

    expect(newState).toEqual({
      reviews: reviewsPayload.reviews,
      metadata: reviewsPayload.metadata,
      addReviewSuccess: false,
      error: null,
      reviewing: false
    });
  });

  it('should handle REVIEW_RECIPE_SUCCESS action', () => {
    const newState = reducer(state, {
      type: 'REVIEW_RECIPE_SUCCESS',
      payload: reviewRecipePayload
    });

    expect(newState).toEqual({
      reviews: [{ id: 5, rating: 5, comment: 'Excellent' }],
      metadata: {},
      addReviewSuccess: true,
      error: null,
      reviewing: false
    });
  });

  it('should handle FETCH_REVIEWS_FAILURE action', () => {
    const newState = reducer(state, {
      type: 'FETCH_REVIEWS_FAILURE',
      payload: 'Error'
    });

    expect(newState).toEqual({ ...state, error: 'Error' });
  });

  it('should handle REVIEW_RECIPE_FAILURE action', () => {
    const newState = reducer(state, {
      type: 'REVIEW_RECIPE_FAILURE',
      payload: 'Error'
    });

    expect(newState).toEqual({ ...state, error: 'Error', addReviewSuccess: false });
  });
});
