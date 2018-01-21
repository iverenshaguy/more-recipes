import React from 'react';
import Header from '../index';

const props = {
  isAuthenticated: false,
  currentLocation: 'auth',
  dispatch: jest.fn()
};

describe('Header', () => {
  it('renders correctly', () => {
    const wrapper = shallow(<Header {...props} />);
    expect(toJson(wrapper)).toMatchSnapshot();
    wrapper.unmount();
  });
});
