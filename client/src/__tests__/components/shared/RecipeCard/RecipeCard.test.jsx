import React from 'react';
import RecipeCard from '../../../../components/shared/RecipeCard';

describe('RecipeCard', () => {
  it('renders correctly', () => {
    const wrapper = shallow(<RecipeCard />);
    expect(toJson(wrapper)).toMatchSnapshot();
    wrapper.unmount();
  });
});
