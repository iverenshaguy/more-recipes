import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import moxios from 'moxios';
import instance from '../../../axios';
import utils from '../../../utils';
import {
  reviewRecipe,
  fetchReviews,
  clearReviewError,
  setReviewing,
  unsetReviewing,
  fetchReviewsSuccess,
  fetchReviewsFailure,
  reviewRecipeSuccess,
  reviewRecipeFailure
} from '../../../actions/recipeReviews';

utils.decodeToken = jest.fn();

utils.decodeToken.mockImplementation(() => ({
  decoded: {
    id: 2,
    username: 'username',
    profilePic: null
  }
}));

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

const review = {
  rating: 5,
  comment: 'Cool'
};

const reviewResponse = {
  id: 1,
  ...review
};

// configure Mock store
const store = mockStore({
  reviews: [],
  metadata: {},
  addReviewSuccess: false,
  error: null,
  reviewing: false
});

describe('Component Actions', () => {
  afterAll(() => {
    jest.clearAllMocks();
  });

  test('clearReviewError', () => {
    const action = clearReviewError();

    expect(action).toEqual({ type: 'CLEAR_REVIEW_ERROR' });
  });

  test('reviewRecipeSuccess', () => {
    const action = reviewRecipeSuccess('payload');

    expect(action).toEqual({ type: 'REVIEW_RECIPE_SUCCESS', payload: 'payload' });
  });

  test('reviewRecipeFailure', () => {
    const action = reviewRecipeFailure('payload');

    expect(action).toEqual({ type: 'REVIEW_RECIPE_FAILURE', payload: 'payload' });
  });

  test('fetchReviewsSuccess', () => {
    const action = fetchReviewsSuccess('payload');

    expect(action).toEqual({ type: 'FETCH_REVIEWS_SUCCESS', payload: 'payload' });
  });

  test('fetchReviewsFailure', () => {
    const action = fetchReviewsFailure('payload');

    expect(action).toEqual({ type: 'FETCH_REVIEWS_FAILURE', payload: 'payload' });
  });

  test('setReviewing', () => {
    const action = setReviewing();

    expect(action).toEqual({ type: 'SET_REVIEWING' });
  });

  test('unsetReviewing', () => {
    const action = unsetReviewing();

    expect(action).toEqual({ type: 'UNSET_REVIEWING' });
  });

  describe('Review Recipes Operations', () => {
    beforeEach(() => {
      moxios.install(instance);
    });

    afterEach(() => {
      moxios.uninstall(instance);
      store.clearActions();
      jest.clearAllMocks();
    });

    it('dispatches SET_REVIEWING, ADD_RECIPE_TO_FAVORITES_SUCCESS and UNSET_SET_REVIEWING succesfully', () => {
      const expectedActions = ['SET_REVIEWING', 'REVIEW_RECIPE_SUCCESS', 'UNSET_REVIEWING', 'TOGGLE_REVIEW_FORM'];

      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: 200,
          response: reviewResponse,
        });
      });

      return store.dispatch(reviewRecipe(1, review)).then(() => {
        const dispatchedActions = store.getActions();

        const actionTypes = dispatchedActions.map(action => action.type);


        expect(actionTypes).toEqual(expectedActions);
      });
    });

    it('dispatches SET_REVIEWING, REVIEW_RECIPE_FAILURE and UNSET_REVIEWING succesfully', () => {
      const expectedActions = ['SET_REVIEWING', 'REVIEW_RECIPE_FAILURE', 'UNSET_REVIEWING'];

      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({ status: 500 });
      });

      return store.dispatch(reviewRecipe(1, { rating: 'hash' })).then(() => {
        const dispatchedActions = store.getActions();

        const actionTypes = dispatchedActions.map(action => action.type);


        expect(actionTypes).toEqual(expectedActions);
      });
    });

    it('dispatches SET_REVIEWING, FETCH_REVIEWS_SUCCESS and UNSET_REVIEWING succesfully', () => {
      const expectedActions = ['SET_REVIEWING', 'FETCH_REVIEWS_SUCCESS', 'UNSET_REVIEWING'];

      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: 200,
          response: reviewResponse,
        });
      });

      return store.dispatch(fetchReviews(2, 1, 5)).then(() => {
        const dispatchedActions = store.getActions();

        const actionTypes = dispatchedActions.map(action => action.type);

        expect(actionTypes).toEqual(expectedActions);
      });
    });

    it('dispatches SET_REVIEWING, FETCH_REVIEWS_FAILURE and UNSET_REVIEWING', () => {
      const expectedActions = ['SET_REVIEWING', 'FETCH_REVIEWS_FAILURE', 'UNSET_REVIEWING'];

      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({ status: 500 });
      });

      return store.dispatch(fetchReviews(2, 1, 5)).then(() => {
        const dispatchedActions = store.getActions();

        const actionTypes = dispatchedActions.map(action => action.type);


        expect(actionTypes).toEqual(expectedActions);
      });
    });
  });
});
