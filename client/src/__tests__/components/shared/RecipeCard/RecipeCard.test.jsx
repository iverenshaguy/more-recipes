import React from 'react';
import RecipeCard from '../../../../components/shared/RecipeCard';

const props = {
  recipe: {
    id: 8,
    recipeName: 'Chicken Pie',
    recipeImage: 'sjkks',
    totalTime: '1hr 30 minutes',
    difficulty: 'Easy',
    upvotes: 150,
    views: 290,
    rating: '4.760'
  }
};

describe('RecipeCard', () => {
  it('renders correctly', () => {
    const wrapper = shallow(<RecipeCard {...props} />);
    expect(toJson(wrapper)).toMatchSnapshot();
    wrapper.unmount();
  });
});
