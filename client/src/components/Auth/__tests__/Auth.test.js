import React from 'react';
import { AuthComponent } from '../index';

const props = {
  authenticating: false,
  isAuthenticated: false,
  submitError: null
};

const loginLocation = {
  pathname: '/login',
  state: { from: { pathname: '/' } }
};

const signupLocation = {
  pathname: '/signup',
  state: { from: { pathname: '/' } }
};

const statelessLocation = {
  pathname: '/signup'
};

describe('Auth', () => {
  it('login: renders correctly', () => {
    const shallowWrapper = shallow(<AuthComponent {...props} location={loginLocation} type="login" />);

    expect(toJson(shallowWrapper)).toMatchSnapshot();
  });

  it('signup: renders correctly', () => {
    const shallowWrapper = shallow(<AuthComponent {...props} location={signupLocation} type="signup" />);

    expect(toJson(shallowWrapper)).toMatchSnapshot();
  });

  it('redirects when authenticated', () => {
    const shallowWrapper = shallow(<AuthComponent {...props} isAuthenticated location={loginLocation} type="login" />);

    expect(toJson(shallowWrapper)).toMatchSnapshot();
  });

  it('redirects when authenticated: stateless location', () => {
    const shallowWrapper = shallow(<AuthComponent {...props} isAuthenticated location={statelessLocation} type="login" />);

    expect(toJson(shallowWrapper)).toMatchSnapshot();
  });
});
