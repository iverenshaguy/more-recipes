import React from 'react';
import Navbar from '../index';

const authProps = {
  isAuthenticated: false,
  type: 'auth',
  logout: jest.fn()
};

const normalProps = {
  isAuthenticated: true,
  type: 'home',
  logout: jest.fn()
};

describe('Navbar', () => {
  it('renders correctly when app is not authenticated', () => {
    const wrapper = shallow(<Navbar {...authProps} />);
    expect(toJson(wrapper)).toMatchSnapshot();
    wrapper.unmount();
  });

  it('renders correctly when type = home', () => {
    const wrapper = shallow(<Navbar {...normalProps} />);
    expect(toJson(wrapper)).toMatchSnapshot();
    wrapper.unmount();
  });
});
