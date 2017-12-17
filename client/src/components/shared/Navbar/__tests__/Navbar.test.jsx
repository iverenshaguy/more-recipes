/* global shallow toJson expect */
import React from 'react';
import Navbar from '../index';

describe('Home', () => {
  it('renders correctly when not authenticated', () => {
    const wrapper = shallow(<Navbar />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('renders correctly when authenticated', () => {
    const wrapper = shallow(<Navbar auth />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
