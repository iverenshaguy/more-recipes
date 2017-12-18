/* global shallow toJson expect */
import React from 'react';
import Navbar from '../index';

describe('Home', () => {
  it('renders correctly when not authenticated', () => {
    const wrapper = shallow(<Navbar type="login" />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('renders correctly when authenticated', () => {
    const wrapper = shallow(<Navbar auth type="home" />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
