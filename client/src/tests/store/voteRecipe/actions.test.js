import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import moxios from 'moxios';
import instance from '../../../axios';
import {
  setVoting,
  unsetVoting,
  voteRecipe,
  voteRecipeSuccess,
  voteRecipeFailure
} from '../../../actions/voteRecipe';

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

describe('Vote Recipe Actions', () => {
  test('voteRecipeSuccess', () => {
    const action = voteRecipeSuccess('payload');

    expect(action).toEqual({ type: 'VOTE_RECIPE_SUCCESS', payload: 'payload' });
  });

  test('voteRecipeFailure', () => {
    const action = voteRecipeFailure('payload');

    expect(action).toEqual({ type: 'VOTE_RECIPE_FAILURE', payload: 'payload' });
  });

  test('setVoting', () => {
    const action = setVoting();

    expect(action).toEqual({ type: 'SET_VOTING' });
  });

  test('unsetVoting', () => {
    const action = unsetVoting();

    expect(action).toEqual({ type: 'UNSET_VOTING' });
  });

  describe('Vote Recipe Operations', () => {
    beforeEach(() => {
      moxios.install(instance);
    });

    afterEach(() => {
      moxios.uninstall(instance);
      store.clearActions();
      jest.clearAllMocks();
    });

    it('dispatches SET_VOTING, VOTE_RECIPE_SUCCESS and UNSET_SET_VOTING succesfully', () => {
      const expectedActions = ['SET_VOTING', 'VOTE_RECIPE_SUCCESS', 'UNSET_VOTING'];

      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: 200,
          response: favoriteResponse,
        });
      });

      return store.dispatch(voteRecipe(1, 'up')).then(() => {
        const dispatchedActions = store.getActions();

        const actionTypes = dispatchedActions.map(action => action.type);


        expect(actionTypes).toEqual(expectedActions);
      });
    });

    it('dispatches SET_VOTING, VOTE_RECIPE_FAILURE and UNSET_SET_VOTING succesfully', () => {
      const expectedActions = ['SET_VOTING', 'VOTE_RECIPE_FAILURE', 'UNSET_VOTING'];

      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({ status: 500 });
      });

      return store.dispatch(voteRecipe(1, 'up')).then(() => {
        const dispatchedActions = store.getActions();

        const actionTypes = dispatchedActions.map(action => action.type);


        expect(actionTypes).toEqual(expectedActions);
      });
    });
  });
});

