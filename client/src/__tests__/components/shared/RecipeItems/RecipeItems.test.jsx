import React from 'react';
import RecipeItems from '../../../../components/shared/RecipeItems';

describe('RecipeItems', () => {
  it('renders correctly', () => {
    const wrapper = shallow(<RecipeItems />);
    expect(toJson(wrapper)).toMatchSnapshot();
    wrapper.unmount();
  });
});
