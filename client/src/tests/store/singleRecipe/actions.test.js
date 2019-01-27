import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import moxios from 'moxios';
import instance from '../../../axios';
import {
  addRecipe,
  addRecipeSuccess,
  addRecipeFailure,
  fetchSingleRecipe,
  fetchRecipeSuccess,
  fetchRecipeFailure,
  updateRecipeImage
} from '../../../actions/singleRecipe';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const mockUploadTask = {
  delete: jest.fn().mockReturnThis()
};

const singleRecipeResponse = {
  recipe: {
    id: 2,
    recipeName: 'Jollof Rice'
  }
};

// configure Mock store
const store = mockStore({
  item: {},
  error: null,
  favoriting: false,
  voting: false
});

describe('Single Recipe Actions', () => {
  afterAll(() => {
    jest.clearAllMocks();
  });

  test('fetchRecipeSuccess', () => {
    const recipes = fetchRecipeSuccess(singleRecipeResponse);

    expect(recipes).toEqual({
      type: 'FETCH_RECIPE_SUCCESS',
      payload: singleRecipeResponse
    });
  });

  test('fetchRecipeFailure', () => {
    const recipes = fetchRecipeFailure('There was a problem');

    expect(recipes).toEqual({
      type: 'FETCH_RECIPE_FAILURE',
      payload: 'There was a problem'
    });
  });

  test('addRecipeSuccess', () => {
    const recipe = addRecipeSuccess(singleRecipeResponse);

    expect(recipe).toEqual({
      type: 'ADD_RECIPE_SUCCESS',
      payload: singleRecipeResponse
    });
  });

  test('addRecipeFailure', () => {
    const recipe = addRecipeFailure('There was a problem');

    expect(recipe).toEqual({
      type: 'ADD_RECIPE_FAILURE',
      payload: 'There was a problem'
    });
  });

  describe('Single Recipe Operations', () => {
    beforeEach(() => {
      moxios.install(instance);
    });

    afterEach(() => {
      moxios.uninstall(instance);
      store.clearActions();
      jest.clearAllMocks();
    });

    it('dispatches SET_ADDING, ADD_RECIPE_SUCCESS, UNSET_ADDING and @@router/CALL_HISTORY_METHOD succesfully', () => {
      const expectedActions = ['SET_ADDING', 'ADD_RECIPE_SUCCESS', 'UNSET_ADDING', '@@router/CALL_HISTORY_METHOD'];

      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: 200,
          response: singleRecipeResponse
        });
      });

      return store.dispatch(addRecipe({ recipeName: 'recipe' })).then(() => {
        const dispatchedActions = store.getActions();

        const actionTypes = dispatchedActions.map(action => action.type);

        expect(actionTypes).toEqual(expectedActions);
      });
    });

    it('dispatches SET_ADDING, ADD_RECIPE_FAILURE and UNSET_ADDING succesfully', () => {
      const expectedActions = ['SET_ADDING', 'ADD_RECIPE_FAILURE', 'UNSET_ADDING'];

      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({ status: 500 });
      });

      return store.dispatch(addRecipe({ recipeName: 'recipe' })).then(() => {
        const dispatchedActions = store.getActions();

        const actionTypes = dispatchedActions.map(action => action.type);


        expect(actionTypes).toEqual(expectedActions);
      });
    });

    it('dispatches SET_FETCHING, FETCH_RECIPE_SUCCESS and UNSET_FETCHING succesfully', () => {
      const expectedActions = ['SET_FETCHING', 'FETCH_RECIPE_SUCCESS', 'UNSET_FETCHING'];

      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: 200,
          response: singleRecipeResponse,
        });
      });

      return store.dispatch(fetchSingleRecipe(2)).then(() => {
        const dispatchedActions = store.getActions();

        const actionTypes = dispatchedActions.map(action => action.type);


        expect(actionTypes).toEqual(expectedActions);
      });
    });

    it('dispatches SET_FETCHING, FETCH_RECIPE_FAILURE and UNSET_FETCHING succesfully', () => {
      const expectedActions = ['SET_FETCHING', 'FETCH_RECIPE_FAILURE', 'UNSET_FETCHING'];

      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({ status: 500 });
      });

      return store.dispatch(fetchSingleRecipe(2)).then(() => {
        const dispatchedActions = store.getActions();

        const actionTypes = dispatchedActions.map(action => action.type);


        expect(actionTypes).toEqual(expectedActions);
      });
    });

    it('dispatches SET_FETCHING, @@router/CALL_HISTORY_METHOD, FETCH_RECIPE_FAILURE and UNSET_FETCHING succesfully', () => {
      const expectedActions = ['SET_FETCHING', '@@router/CALL_HISTORY_METHOD', 'FETCH_RECIPE_FAILURE', 'UNSET_FETCHING'];

      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: 422,
          response: {
            errors: {
              recipeId: { msg: 'Recipe Not Found' }
            }
          }
        });
      });

      return store.dispatch(fetchSingleRecipe(2)).then(() => {
        const dispatchedActions = store.getActions();

        const actionTypes = dispatchedActions.map(action => action.type);

        expect(actionTypes).toEqual(expectedActions);
      });
    });

    it('dispatches SET_UPLOADING, UPDATE_RECIPE_IMAGE_SUCCESS and UNSET_UPLOADING successfully', () => {
      const expectedActions = ['SET_UPLOADING', 'UPDATE_RECIPE_IMAGE_SUCCESS', 'UNSET_UPLOADING'];

      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: 200,
          response: singleRecipeResponse,
        });
      });

      return store.dispatch(updateRecipeImage('image.com/pic', 3, { delete: () => 'delete' })).then(() => {
        const dispatchedActions = store.getActions();

        const actionTypes = dispatchedActions.map(action => action.type);

        expect(actionTypes).toEqual(expectedActions);
      });
    });

    it('dispatches SET_UPLOADING, UPDATE_RECIPE_IMAGE_FAILURE and UNSET_UPLOADING successfully and cancels upload task', () => {
      const expectedActions = ['SET_UPLOADING', 'UPDATE_RECIPE_IMAGE_FAILURE', 'UNSET_UPLOADING'];

      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({ status: 500 });
      });

      return store.dispatch(updateRecipeImage('image.com/pic', 3, mockUploadTask)).then(() => {
        const dispatchedActions = store.getActions();

        const actionTypes = dispatchedActions.map(action => action.type);

        expect(actionTypes).toEqual(expectedActions);
        expect(mockUploadTask.delete).toHaveBeenCalled();
      });
    });

    it('dispatches SET_UPLOADING, UPDATE_RECIPE_IMAGE_FAILURE and UNSET_UPLOADING successfully only', () => {
      const expectedActions = ['SET_UPLOADING', 'UPDATE_RECIPE_IMAGE_FAILURE', 'UNSET_UPLOADING'];

      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({ status: 500 });
      });

      return store.dispatch(updateRecipeImage('image.com/pic', 3, undefined)).then(() => {
        const dispatchedActions = store.getActions();

        const actionTypes = dispatchedActions.map(action => action.type);

        expect(actionTypes).toEqual(expectedActions);
        expect(mockUploadTask.delete).not.toHaveBeenCalled();
      });
    });
  });
});
