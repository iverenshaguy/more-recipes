import React from 'react';
import RecipeDetailsSection from '../../../../components/shared/RecipeDetailsSection';

const recipe = {
  id: 2,
  recipeName: 'Recipe',
  userId: 1,
  isReviewed: false,
  ingredients: ['rice', 'beans'],
  preparations: ['wash', 'cook'],
  directions: ['wash', 'cook'],
  User: {
    id: 1,
    username: 'name'
  }
};

describe('RecipeDetailsSection', () => {
  it('renders correctly', () => {
    const wrapper = mount(<RecipeDetailsSection recipe={recipe} />);
    expect(toJson(wrapper)).toMatchSnapshot();
    wrapper.unmount();
  });
});
