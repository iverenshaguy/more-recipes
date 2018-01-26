import React from 'react';
import Navbar from '../index';

const logoutMock = jest.fn();

const authProps = {
  isAuthenticated: false,
  type: 'auth',
  logout: logoutMock
};

const normalProps = {
  isAuthenticated: true,
  type: 'home',
  logout: logoutMock
};

describe('Navbar', () => {
  it('renders correctly when app is not authenticated', () => {
    const wrapper = shallow(<Navbar {...authProps} />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('renders correctly when type = home', () => {
    const wrapper = shallow(<Navbar {...normalProps} />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('logs user out on logout click', () => {
    const wrapper = shallow(<Navbar {...normalProps} />);
    expect(toJson(wrapper)).toMatchSnapshot();
    wrapper.find('a[href="/login"]').simulate('click', { preventDefault() { } });

    expect(logoutMock).toHaveBeenCalled();
  });
});
