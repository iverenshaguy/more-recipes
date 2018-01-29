import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import moxios from 'moxios';
import instance from '../../../axios';
import {
  fetchTopRecipes,
  fetchRecipesSuccess,
  fetchRecipesFailure,
  searchRecipes
} from '../../../actions/recipes';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

const recipesResponse = {
  recipes: [{ id: 1, recipeName: 'Rice' }, { id: 5, recipeName: 'Beans' }],
  metaData: {
    page: 1
  }
};

// configure Mock store
const store = mockStore({
  recipes: [],
  errorMessage: '',
  metaData: {}
});

describe('Recipes Actions', () => {
  afterAll(() => {
    jest.clearAllMocks();
  });

  test('fetchRecipesSuccess', () => {
    const recipes = fetchRecipesSuccess('RECEIVE_TOP_RECIPES_SUCCESS', recipesResponse);

    expect(recipes).toEqual({
      type: 'RECEIVE_TOP_RECIPES_SUCCESS',
      payload: recipesResponse
    });
  });

  test('fetchRecipesFailure', () => {
    const recipes = fetchRecipesFailure('RECEIVE_TOP_RECIPES_FAILURE', 'There was a problem');

    expect(recipes).toEqual({
      type: 'RECEIVE_TOP_RECIPES_FAILURE',
      payload: 'There was a problem'
    });
  });

  describe('Recipes Operations', () => {
    beforeEach(() => {
      moxios.install(instance);
    });

    afterEach(() => {
      moxios.uninstall(instance);
      store.clearActions();
      jest.clearAllMocks();
    });

    it('dispatches SET_FETCHING, RECEIVE_TOP_RECIPES_SUCCESS and UNSET_FETCHING succesfully', () => {
      const expectedActions = ['SET_FETCHING', 'RECEIVE_TOP_RECIPES_SUCCESS', 'UNSET_FETCHING'];

      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: 200,
          response: recipesResponse,
        });
      });

      return store.dispatch(fetchTopRecipes(1, 5)).then(() => {
        const dispatchedActions = store.getActions();

        const actionTypes = dispatchedActions.map(action => action.type);


        expect(actionTypes).toEqual(expectedActions);
      });
    });

    it('dispatches SET_FETCHING, RECEIVE_TOP_RECIPES_FAILURE and UNSET_FETCHING succesfully', () => {
      const expectedActions = ['SET_FETCHING', 'RECEIVE_TOP_RECIPES_FAILURE', 'UNSET_FETCHING'];

      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({ status: 500 });
      });

      return store.dispatch(fetchTopRecipes(1, 5)).then(() => {
        const dispatchedActions = store.getActions();

        const actionTypes = dispatchedActions.map(action => action.type);


        expect(actionTypes).toEqual(expectedActions);
      });
    });

    it('dispatches SET_FETCHING, RECEIVE_SEARCH_RESULTS_SUCCESS and UNSET_FETCHING succesfully', () => {
      const expectedActions = ['SET_FETCHING', 'RECEIVE_SEARCH_RESULTS_SUCCESS', 'UNSET_FETCHING'];

      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: 200,
          response: recipesResponse,
        });
      });

      return store.dispatch(searchRecipes('chicken', 1, 5)).then(() => {
        const dispatchedActions = store.getActions();

        const actionTypes = dispatchedActions.map(action => action.type);


        expect(actionTypes).toEqual(expectedActions);
      });
    });

    it('dispatches SET_FETCHING, RECEIVE_SEARCH_RESULTS_SUCCESS and UNSET_FETCHING succesfully when there are no results', () => {
      const expectedActions = ['SET_FETCHING', 'RECEIVE_SEARCH_RESULTS_SUCCESS', 'UNSET_FETCHING'];

      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: 200,
          response: {
            message: 'Your search returned no results'
          },
        });
      });

      return store.dispatch(searchRecipes('rice', 1, 5)).then(() => {
        const dispatchedActions = store.getActions();

        const actionTypes = dispatchedActions.map(action => action.type);


        expect(actionTypes).toEqual(expectedActions);
        expect(dispatchedActions[1].payload).toEqual({
          recipes: [],
          metaData: {}
        });
      });
    });

    it('dispatches SET_FETCHING, RECEIVE_SEARCH_RESULTS_FAILURE and UNSET_FETCHING succesfully', () => {
      const expectedActions = ['SET_FETCHING', 'RECEIVE_SEARCH_RESULTS_FAILURE', 'UNSET_FETCHING'];

      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({ status: 500 });
      });

      return store.dispatch(searchRecipes('chicken', 1, 5)).then(() => {
        const dispatchedActions = store.getActions();

        const actionTypes = dispatchedActions.map(action => action.type);


        expect(actionTypes).toEqual(expectedActions);
      });
    });

    it('reloads page if token is expired', () => {
      const reloadSpy = jest.spyOn(window.location, 'reload');

      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({ status: 403, response: { error: 'User authorization token is expired' } });
      });

      return store.dispatch(searchRecipes('turkey', 1, 5)).then(() => {
        expect(reloadSpy).toHaveBeenCalled();
      });
    });
  });
});
