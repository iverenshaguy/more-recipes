import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import moxios from 'moxios';
import instance from '../../../axios';
import {
  setFavoriting,
  unsetFavoriting,
  fetchFavoriteRecipes,
  addRecipeToFavorites,
  fetchFavoriteRecipesSuccess,
  fetchFavoriteRecipesFailure,
  addRecipeToFavoritesSuccess,
  addRecipeToFavoritesFailure
} from '../../../actions/favoriteRecipes';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

const favoriteResponse = {
  message: 'Success',
  recipe: {
    recipeName: 'Rice'
  }
};

// configure Mock store
const store = mockStore({
  item: {},
  error: null,
  favoriting: false,
  voting: false
});

describe('Component Actions', () => {
  test('addRecipeToFavoritesSuccess', () => {
    const action = addRecipeToFavoritesSuccess('payload');

    expect(action).toEqual({ type: 'ADD_RECIPE_TO_FAVORITES_SUCCESS', payload: 'payload' });
  });

  test('addRecipeToFavoritesFailure', () => {
    const action = addRecipeToFavoritesFailure('payload');

    expect(action).toEqual({ type: 'ADD_RECIPE_TO_FAVORITES_FAILURE', payload: 'payload' });
  });

  test('fetchFavoriteRecipesSuccess', () => {
    const action = fetchFavoriteRecipesSuccess('payload');

    expect(action).toEqual({ type: 'FETCH_FAVORITE_RECIPES_SUCCESS', payload: 'payload' });
  });

  test('fetchFavoriteRecipesFailure', () => {
    const action = fetchFavoriteRecipesFailure('payload');

    expect(action).toEqual({ type: 'FETCH_FAVORITE_RECIPES_FAILURE', payload: 'payload' });
  });

  test('setFavoriting', () => {
    const action = setFavoriting();

    expect(action).toEqual({ type: 'SET_FAVORITING' });
  });

  test('unsetFavoriting', () => {
    const action = unsetFavoriting();

    expect(action).toEqual({ type: 'UNSET_FAVORITING' });
  });

  describe('Favorite Recipes Operations', () => {
    beforeEach(() => {
      moxios.install(instance);
    });

    afterEach(() => {
      moxios.uninstall(instance);
      store.clearActions();
      jest.clearAllMocks();
    });

    it('dispatches SET_FAVORITING, ADD_RECIPE_TO_FAVORITES_SUCCESS and UNSET_SET_FAVORITING succesfully', () => {
      const expectedActions = ['SET_FAVORITING', 'ADD_RECIPE_TO_FAVORITES_SUCCESS', 'UNSET_FAVORITING'];

      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: 200,
          response: favoriteResponse,
        });
      });

      return store.dispatch(addRecipeToFavorites(1)).then(() => {
        const dispatchedActions = store.getActions();

        const actionTypes = dispatchedActions.map(action => action.type);


        expect(actionTypes).toEqual(expectedActions);
      });
    });

    it('dispatches SET_FAVORITING, ADD_RECIPE_TO_FAVORITES_FAILURE and UNSET_SET_FAVORITING succesfully', () => {
      const expectedActions = ['SET_FAVORITING', 'ADD_RECIPE_TO_FAVORITES_FAILURE', 'UNSET_FAVORITING'];

      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({ status: 500 });
      });

      return store.dispatch(addRecipeToFavorites(1)).then(() => {
        const dispatchedActions = store.getActions();

        const actionTypes = dispatchedActions.map(action => action.type);


        expect(actionTypes).toEqual(expectedActions);
      });
    });

    it('dispatches SET_FETCHING, FETCH_FAVORITE_RECIPES_SUCCESS and UNSET_FETCHING succesfully', () => {
      const expectedActions = ['SET_FETCHING', 'FETCH_FAVORITE_RECIPES_SUCCESS', 'UNSET_FETCHING'];

      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: 200,
          response: favoriteResponse,
        });
      });

      return store.dispatch(fetchFavoriteRecipes(2)).then(() => {
        const dispatchedActions = store.getActions();

        const actionTypes = dispatchedActions.map(action => action.type);

        expect(actionTypes).toEqual(expectedActions);
      });
    });

    it('dispatches SET_FETCHING, FETCH_FAVORITE_RECIPES_SUCCESS and UNSET_FETCHING succesfully when there are no results', () => {
      const expectedActions = ['SET_FETCHING', 'FETCH_FAVORITE_RECIPES_SUCCESS', 'UNSET_FETCHING'];

      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: 200,
          response: {
            message: 'You have no favorite recipes'
          },
        });
      });

      return store.dispatch(fetchFavoriteRecipes(2)).then(() => {
        const dispatchedActions = store.getActions();

        const actionTypes = dispatchedActions.map(action => action.type);


        expect(actionTypes).toEqual(expectedActions);
        expect(dispatchedActions[1].payload).toEqual({
          message: 'You have no favorite recipes'
        });
      });
    });

    it('dispatches SET_FETCHING, FETCH_FAVORITE_RECIPES_FAILURE and UNSET_FETCHING succesfully', () => {
      const expectedActions = ['SET_FETCHING', 'FETCH_FAVORITE_RECIPES_FAILURE', 'UNSET_FETCHING'];

      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({ status: 500 });
      });

      return store.dispatch(fetchFavoriteRecipes(2)).then(() => {
        const dispatchedActions = store.getActions();

        const actionTypes = dispatchedActions.map(action => action.type);


        expect(actionTypes).toEqual(expectedActions);
      });
    });
  });
});

