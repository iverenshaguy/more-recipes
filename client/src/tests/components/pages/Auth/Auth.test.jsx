import React from 'react';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { MemoryRouter } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import Auth, { AuthComponent } from '../../../../components/pages/Auth';
import Home from '../../../../components/pages/Home';
import App from '../../../../components/App';
import initialValues from '../../../setup/initialValues';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);
const unAuthStore = mockStore({
  ...initialValues,
  auth: {
    ...initialValues.auth, isAuthenticated: false
  }
});
const authStore = mockStore(initialValues);

const dispatchMock = jest.fn();

const props = {
  submitting: false,
  isAuthenticated: false,
  submitError: null,
  dispatch: dispatchMock
};

const loginLocation = {
  pathname: '/login',
  state: { from: { pathname: '/' } }
};

const signupLocation = {
  pathname: '/signup',
  state: { from: { pathname: '/' } }
};

const signupMeta = {
  title: 'Register for a New Account',
  btnText: 'SIGN UP',
  extra: <p>something</p>
};

const loginMeta = {
  title: 'Sign In to Your Account',
  btnText: 'SIGN IN',
  extra: <p>something</p>
};

const statelessLocation = {
  pathname: '/signup'
};

describe('Auth', () => {
  it('login: renders correctly', () => {
    const shallowWrapper = shallow(<AuthComponent {...props} location={loginLocation} type="login" meta={loginMeta} />);

    expect(toJson(shallowWrapper)).toMatchSnapshot();
  });

  it('signup: renders correctly', () => {
    const shallowWrapper = shallow(<AuthComponent {...props} location={signupLocation} type="signup" meta={signupMeta} />);

    expect(toJson(shallowWrapper)).toMatchSnapshot();
  });

  it('renders login page when unauthenticated', () => {
    const wrapper = mount( //eslint-disable-line
      <MemoryRouter
        initialEntries={['/login']}
      >
        <Provider store={unAuthStore}>
          <App />
        </Provider>
      </MemoryRouter>);

    expect(wrapper.find(Auth)).toHaveLength(1);
    expect(wrapper.find(Home)).toHaveLength(0);

    wrapper.unmount();
  });

  it('redirects to another location when authenticated', () => {
    const wrapper = mount( //eslint-disable-line
      <MemoryRouter
        initialEntries={['/login']}
      >
        <Provider store={authStore}>
          <App />
        </Provider>
      </MemoryRouter>);

    expect(wrapper.find(Home)).toHaveLength(1);
    expect(wrapper.find(Auth)).toHaveLength(0);

    wrapper.unmount();
  });

  it('redirects when authenticated: login', () => {
    const shallowWrapper = shallow(<AuthComponent {...props} isAuthenticated location={loginLocation} type="login" meta={loginMeta} />);

    expect(toJson(shallowWrapper)).toMatchSnapshot();
  });

  it('redirects when authenticated: signup', () => {
    const shallowWrapper = shallow(<AuthComponent {...props} isAuthenticated location={signupLocation} type="signup" meta={signupMeta} />);

    expect(toJson(shallowWrapper)).toMatchSnapshot();
  });

  it('redirects when authenticated: stateless location', () => {
    const shallowWrapper = shallow(<AuthComponent {...props} isAuthenticated location={statelessLocation} type="login" meta={loginMeta} />);

    expect(toJson(shallowWrapper)).toMatchSnapshot();
  });
});
