import React from 'react';
import RecipeCard from '../index';

describe('RecipeCard', () => {
  it('renders correctly', () => {
    const wrapper = shallow(<RecipeCard />);
    expect(toJson(wrapper)).toMatchSnapshot();
    wrapper.unmount();
  });
});
