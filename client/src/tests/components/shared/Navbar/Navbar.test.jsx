import React from 'react';
import Navbar from '../../../../components/shared/Navbar';

const logoutMock = jest.fn();

const authProps = {
  isAuthenticated: false,
  type: 'auth',
  showAddRecipeModal: jest.fn(),
  user: { firstname: 'Dave', lastname: 'Smith' },
  logout: logoutMock
};

const normalProps = {
  isAuthenticated: true,
  type: 'home',
  showAddRecipeModal: jest.fn(),
  user: { firstname: 'Dave', lastname: 'Smith' },
  logout: logoutMock
};

const profileImageProps = {
  ...normalProps,
  user: {
    ...normalProps.user,
    profilePic: 'pic'
  }
};

describe('Navbar', () => {
  it('renders correctly when app is not authenticated', () => {
    const wrapper = shallow(<Navbar {...authProps} />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('renders correctly when type = home', () => {
    const wrapper = shallow(<Navbar {...normalProps} />);
    expect(toJson(wrapper)).toMatchSnapshot();
    expect(wrapper.find('img[src="images/user-image-placeholder.png"]').length).toEqual(1);
  });

  it('renders user-image correctly when not provided', () => {
    const wrapper = shallow(<Navbar {...profileImageProps} />);
    expect(wrapper.find('img[src="pic"]').length).toEqual(1);
  });

  it('logs user out on logout click', () => {
    const wrapper = shallow(<Navbar {...normalProps} />);
    expect(toJson(wrapper)).toMatchSnapshot();
    wrapper.find('a[href="/login"]').simulate('click', { preventDefault() { } });

    expect(logoutMock).toHaveBeenCalled();
  });
});
