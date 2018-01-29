import React from 'react';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';
import { Redirect, MemoryRouter } from 'react-router-dom';
import requireAuthentication from '../../../components/hoc/authentication';
import PreLoader from '../../../components/shared/PreLoader';
import rootReducer from '../../../reducers';

const initialValues = {
  auth: {
    isAuthenticated: true,
    error: null,
    user: { firstname: 'Dave', lastname: 'Smith' },
    loading: false
  },
  location: {
    current: 'auth'
  },
  ui: {
    modals: {
      social: false,
      addRecipe: false
    }
  },
  isFetching: false,
  recipes: {
    recipes: [],
    errorMessage: '',
    metaData: {}
  }
};

const loadingInitialValues = {
  ...initialValues,
  auth: { ...initialValues.auth, loading: true }
};

const authStore = createStore(rootReducer, initialValues, applyMiddleware(thunk));
const loadingStore = createStore(rootReducer, loadingInitialValues, applyMiddleware(thunk));
const store = createStore(rootReducer, applyMiddleware(thunk));

const setup = () => {
  const dispatch = jest.fn();

  const props = {
    dispatch
  };

  const MockComponent = () => (<div>Hi</div>);
  MockComponent.displayName = 'MockComponent';

  const HOCComponent = requireAuthentication(MockComponent);
  // const context = { router: { push: jest.fn() } };
  const location = {
    pathname: '/login',
    state: { from: { pathname: '/' } }
  };

  const component = (
    <Provider store={store}>
      <MemoryRouter>
        <HOCComponent location={location} />
      </MemoryRouter>
    </Provider>
  );

  const wrapper = shallow(component);

  const authComponent = (
    <Provider store={authStore}>
      <MemoryRouter>
        <HOCComponent location={location} />
      </MemoryRouter>
    </Provider>);

  const authWrapper = mount(authComponent);

  const loadingComponent = (
    <Provider store={loadingStore}>
      <MemoryRouter>
        <HOCComponent location={location} />
      </MemoryRouter>
    </Provider>);

  const loadingWrapper = mount(loadingComponent);

  const unAuthComponent = (
    <Provider store={store}>
      <MemoryRouter>
        <HOCComponent location={location} />
      </MemoryRouter>
    </Provider>);

  const unAuthWrapper = mount(unAuthComponent);

  return {
    props, unAuthWrapper, authWrapper, loadingWrapper, wrapper, MockComponent
  };
};

describe('HOC: requireAuthentication', () => {
  afterAll(() => {
    jest.clearAllMocks();
  });

  it('renders correctly', () => {
    const { wrapper } = setup();

    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('renders unauthorized component: Redirect', () => {
    const { unAuthWrapper, MockComponent } = setup();

    expect(unAuthWrapper.find(Redirect).length).toBeTruthy();
    expect(unAuthWrapper.find(MockComponent).length).toBeFalsy();

    unAuthWrapper.unmount();
  });

  it('renders authorized component: MockComponent', () => {
    const { authWrapper, MockComponent } = setup();

    expect(authWrapper.find(MockComponent).length).toBeTruthy();
    expect(authWrapper.find(Redirect).length).toBeFalsy();

    authWrapper.unmount();
  });

  it('renders loading component: Loading', () => {
    const { loadingWrapper, MockComponent } = setup();

    expect(loadingWrapper.find(PreLoader).length).toBeTruthy();
    expect(loadingWrapper.find(MockComponent).length).toBeFalsy();

    loadingWrapper.unmount();
  });
});
